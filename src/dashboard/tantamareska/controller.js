'use strict';


export default class TantamareskaCtrl {
    constructor($scope, tanService, shareModal) {
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
    }
}