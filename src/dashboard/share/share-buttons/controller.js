'use strict';

export default class ShareCtrl {
    constructor(shareService, session, $location, $rootScope) {
        this.shareService = shareService;
        this.$location = $location;
        this.session = session;
        this.$rootScope = $rootScope;
        this.resultData = this.data;
        if (!this.resultData) {
            this.resultData = {}
        }
        this.updateLinks();



        $rootScope.$on('$stateChangeSuccess', () => {
            this.resultData = {};
            this.updateLinks();
        });
    }

    updateLinks() {
        this.resultData.picture = this.resultData.picture ? this.resultData.picture : 'https://cloud.githubusercontent.com/assets/8914398/14580929/6ed40170-03e7-11e6-9458-bf90b732469c.jpg';
        this.resultData.imgUrl = this.resultData.imgUrl ? this.resultData.imgUrl : this.resultData.picture;
        this.resultData.url = this.resultData.url ? this.resultData.url : this.$location.absUrl();
        this.resultData.title = this.resultData.title ? this.resultData.title : this.$rootScope.metaTitle ? this.$rootScope.metaTitle : 'Skoda Hockey 2016';
        this.resultData.description = this.resultData.description ? this.resultData.description : this.$rootScope.metaDescription ? this.$rootScope.metaDescription : '';


        this.facebookShareLink = "https://www.facebook.com/sharer.php?src=sp&u=" + this.resultData.url + "&picture=" + this.resultData.imgUrl +
            "&description=" + this.resultData.description + "&title=" + this.resultData.title + "&link" + this.resultData.url + "&name=" + this.resultData.url;

        this.vkShareLink = "http://vk.com/share.php?url=" + this.resultData.url + "&title=" + this.resultData.title +
            "&description=" + this.resultData.description + "&image=" + this.resultData.imgUrl;

        this.twitterShareLink = "https://twitter.com/intent/tweet?text=" + this.resultData.title + "&url=" + this.resultData.url + "&hashtags=хоккейвкаждом,чмх2016";
    }

    tryShare() {
        if (this.session.isAuthenticated) {
            this.shareService.shareAttempt(this.resultData.type || 'page');
        }
    }
}
