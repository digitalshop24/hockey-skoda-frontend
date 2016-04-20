'use strict';


export default class FactsCtrl {
    constructor(facts, page, $state, factService, tag, hockeyActive, skodaActive, $location, $stateParams) {
        this.facts = facts;
        this.state = $state;
        this.currentPage = page;
        this.factService = factService;
        this.tag = tag;
        this.$stateParams = $stateParams;
        this.hockeyActive = hockeyActive;
        this.skodaActive = skodaActive;

        const startUrl =  $location.absUrl().substring(0,$location.absUrl().indexOf('/interesting-facts/'));
        facts.forEach(post => {
            post.repostText = post.reposts + ' ' + this.getRepostText(post.network);
            post.iconUrl = this.getIconUrl(post.network);
            post.shareData = {
                description: post.content,
                url: startUrl + '/interesting-facts/' + post.post_id
            }
        });
    }

    changeTag(info) {
        this.state.go('dashboard.facts', {
            tag: info.tag,
            hockeyActive: !!info.hockeyActive,
            skodaActive: !!info.skodaActive
        });
    }

    readMore(fact) {
        this.state.transitionTo('dashboard.facts', {id: fact.post_id}, {notify: false});
        this.currentFact = fact;
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
        if (this.busy) return;
        this.busy = true;

        this.factService.getFacts(++this.currentPage, this.$stateParams.perPage, this.tag)
            .then((res) => {
                this.facts = this.facts.concat(res);
                this.busy = false;
            }).catch(err => {
                this.busy = false;
            });
    }
}