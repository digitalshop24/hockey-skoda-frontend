'use strict';


export default class SuggestionsCtrl {
    constructor($scope, suggestionService, shareModal) {
        this.imageUrl = "";
        this.title = 'Hockey%20skoda%20%23%D1%85%D0%BE%D0%BA%D0%BA%D0%B5%D0%B9';
        this.desc = 'Моя открытка';
        $scope.$on('suggestions:imageMerged', (event, data) => {
            this.sendButtonText = "Создание картинки...";
            this.isButtonDisabled = true;
            suggestionService.loadImage(data.image)
                .then(res => {
                    this.imageUrl = res.image.original;
                    this.sendButtonText = "Отправить";
                    this.isButtonDisabled = false;
                    shareModal.open({
                        resolve: {
                            data: {
                                imgUrl: this.imageUrl.split('?')[0],
                                title: this.title,
                                description: this.desc,
                                type: 'suggestion'
                            }
                        }
                    });
                });
        });
    }
}