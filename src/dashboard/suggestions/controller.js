'use strict';


export default class SuggestionsCtrl {
    constructor($scope, suggestionService, modal) {
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
                    modal.open({
                        resolve: {
                            message: () => {
                                var shareHeader = '<ul class="tantam-share" social-init>';
                                var shareItemBefore = '<li><a class="sharing-link" href="';
                                var shareItemAfter = '</a></li>';
                                var shareFooter = '</ul>';
                                var imgUrl = this.imageUrl.split('?');
                                imgUrl = imgUrl[0];
                                var shareFacebook = shareItemBefore + 'https://www.facebook.com/sharer.php?src=sp&u=' + imgUrl + '"><i class="fa fa-facebook" aria-hidden="true"></i>' + shareItemAfter;
                                var shareTwitter = shareItemBefore + 'https://twitter.com/intent/tweet?text=' + this.title + '&url=' + imgUrl + '"><i class="fa fa-twitter" aria-hidden="true"></i>' + shareItemAfter;
                                var shareVk = shareItemBefore + 'http://vk.com/share.php?url=' + imgUrl + '&title=' + this.title + '&description=' + this.desc + '&image=' + imgUrl + '"><i class="fa fa-vk" aria-hidden="true"></i>' + shareItemAfter;
                                var share = shareHeader + shareFacebook + shareTwitter + shareVk + shareFooter;
                                return '<p>Картинка успешно создана! Теперь Вы можете поделиться ей с друзьями!</p><h4 class="share-modal--header">Выберите соц.сеть</h4>' + share;
                            }
                        }
                    });
                });
        });
    }
}