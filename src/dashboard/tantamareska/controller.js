'use strict';


export default class TantamareskaCtrl {
    constructor($scope, tanService, shareModal, modalSpeed) {
        this.imageUrl = "";
        this.title = 'Hockey%20skoda%20%23%D1%85%D0%BE%D0%BA%D0%BA%D0%B5%D0%B9';
        this.desc = 'Моя тантамареска';
        $scope.$on('tantamareska:imageMerged', (event, data) => {
            this.sendButtonText = "Создание картинки...";
            this.isButtonDisabled = true;
            tanService.loadImage(data.image)
                .then(res => {
                    this.imageUrl = res.image.original;
                    this.sendButtonText = "Cоздать изображение";
                    this.isButtonDisabled = false;
                    shareModal.open({
                        resolve: {
                            data: {
                                imgUrl: this.imageUrl.split('?')[0],
                                title: this.title,
                                description: this.desc,
                                type: 'tantamareska'

                            }
                        }
                    });
                });
        });
        this.modalSpeed = modalSpeed;
    }
    openSpeed() {
        if(localStorage["modalSpeedTantam"] == null){
            localStorage["modalSpeedTantam"] = "showed";
            this.modalSpeed.open({
              resolve: {
                  message: () => {
                    var header = 'Поделится с друзьями';
                    var text = 'Загрузите свою фотографию и поделитесь оригинальной тантамареской с друзьями в социальной сети! Если вы нажмете "Поделиться" на любой из страниц сайта, вам будут начислены бонусные баллы. Бонусные баллы начисляются не чаще 1 раза каждые 3 часа.';
                    var message = '<h2>' + header + '</h2><p>' + text + '</p>';
                    return message;
                  }
              },
              windowClass: 'modal-window modal-window_right',
            });
        return;
        }
    }
}