'use strict';


export default class TantamareskaCtrl {
    constructor($scope, tanService, modal) {
        this.imageUrl = "";
        $scope.$on('tantamareska:imageMerged', (event, data) => {
            this.sendButtonText = "Создание картинки...";
            this.isButtonDisabled = true;
            tanService.loadImage(data.image)
                .then(res => {
                    this.imageUrl = res.image.original;
                    this.sendButtonText = "Отправить";
                    this.isButtonDisabled = false;
                    modal.open({
                        resolve: {
                            message: () => {
                                return "Картинка успешно создана! Теперь Вы можете поделиться ей с друзьями!"
                            }
                        }
                    });
                });
        });
    }
}