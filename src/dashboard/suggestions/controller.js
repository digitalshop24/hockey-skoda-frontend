'use strict';


export default class SuggestionsCtrl {
    constructor($scope, suggestionService, modal) {
        this.imageUrl = "";
        $scope.$on('suggestions:imageMerged', (event, data) => {
            this.sendButtonText = "Создание картинки...";
            this.isButtonDisabled = true;
            suggestionService.loadImage(data.image)
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