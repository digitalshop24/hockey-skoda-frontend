'use strict';


export default class TantamareskaCtrl {
    constructor($scope, tanService, modal) {
        this.imageUrl = "";
        this.title = 'Hockey%20skoda%20%23%D1%85%D0%BE%D0%BA%D0%BA%D0%B5%D0%B9';
        this.desc = 'Моя тантамареска';
        $scope.$on('tantamareska:imageMerged', (event, data) => {
            this.sendButtonText = "Создание картинки...";
            this.isButtonDisabled = true;
            this.mainImg = 'img/resources/img/tantam/tantamareska-1.png';
            tanService.loadImage(data.image)
                .then(res => {
                    this.imageUrl = res.image.original;
                    this.sendButtonText = "Cоздать изображение";
                    this.isButtonDisabled = false;
                    modal.open({
                        resolve: {
                            message: () => {
                                var shareHeader = '<ul class="tantam-share">';
                                var shareItemBefore = '<li><a class="sharing-link" href="';
                                var shareItemAfter = '</a></li>';
                                var shareFooter = '</ul>';
                                var shareFacebook = shareItemBefore + 'https://www.facebook.com/sharer.php?src=sp&u=' + this.imageUrl + '"><i class="fa fa-facebook" aria-hidden="true"></i>' + shareItemAfter;
                                var shareTwitter = shareItemBefore + 'https://twitter.com/intent/tweet?text=' + this.title + '&url=' + this.imageUrl + '"><i class="fa fa-twitter" aria-hidden="true"></i>' + shareItemAfter;
                                var shareVk = shareItemBefore + 'http://vk.com/share.php?url=' + this.imageUrl + '&title=' + this.title + '&description=' + this.desc + '&image=' + this.imageUrl + '"><i class="fa fa-vk" aria-hidden="true"></i>' + shareItemAfter;
                                var share = shareHeader + shareFacebook + shareTwitter + shareVk + shareFooter;
                                return '<p>Картинка успешно создана! Теперь Вы можете поделиться ей с друзьями!</p><h4 class="share-modal--header">Выберите соц.сеть</h4>' + share;
                            }
                        }
                    });
                });
        });
    }
}