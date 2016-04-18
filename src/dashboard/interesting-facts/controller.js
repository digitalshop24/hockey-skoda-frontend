'use strict';


export default class FactsCtrl {
    constructor(facts, page, $state) {
        this.facts = facts;
        this.state = $state;
        this.currentPage = page;

        facts.forEach(post => {
            post.repostText = post.reposts + ' ' + this.getRepostText(post.network);
            post.iconUrl = this.getIconUrl(post.network);
            post.shareData = {
                description: post.content
            }
        });
    }

    getRepostText(network) {
        if (network == 'twitter') {
            return 'ретвитов';
        }
        return 'репостов';
    }


    getIconUrl(network) {
        switch (network) {
            case 'vk':
                return 'img/resources/img/soc/vk.png';
            case 'facebook':
                return 'img/resources/img/soc/f.png';
            case 'twitter':
                return 'img/resources/img/soc/twiter.png';
            case 'instagramm':
                return 'img/resources/img/soc/insta.png';
        }
    }

    loadMore() {
        this.state.go('dashboard.facts', {
            facts: this.facts,
            page: ++this.currentPage,
            notScrollToTop: true
        });
    }
}