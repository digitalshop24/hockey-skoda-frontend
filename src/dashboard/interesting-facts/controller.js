'use strict';


export default class FactsCtrl {
    constructor(facts, page, $state, factService, tag, $location, $stateParams, isSocialFacts, skodaFacts, skodaPerPage, factById) {
        this.facts = isSocialFacts ? facts : skodaFacts;
        if(!isSocialFacts) {
            this.facts.forEach(fact => {
                fact.content = fact.name;
                fact.photos = [{image: fact.image}];
            })
        }
        this.state = $state;
        this.isSocialFacts = isSocialFacts;
        this.currentPage = page;
        this.factService = factService;
        this.tag = tag;
        this.$stateParams = $stateParams;
        this.skodaPerPage = skodaPerPage;

        const startUrl =  $location.absUrl().substring(0,$location.absUrl().indexOf('/interesting-facts/'));
        facts.forEach(post => {
            post.repostText = post.reposts + ' ' + this.getRepostText(post.network);
            post.iconUrl = this.getIconUrl(post.network);
            post.shareData = {
                url: startUrl + '/interesting-facts/' + post.post_id
            }
        });

        if(factById) {
            this.readMore(factById);
        }
    }

    changeTag(info) {
        this.state.go('dashboard.facts', {
            tag: info.tag,
            isSocialFacts: true
        });
    }

    loadSkodaFacts() {
        this.state.go('dashboard.facts', {
            isSocialFacts: false
        });
    }

    readMore(fact) {
        this.state.transitionTo('dashboard.facts', {id: fact.post_id}, {notify: false});
        this.currentFact = fact;
        $('#fact-modal').modal('show');
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


        if(this.isSocialFacts) {
            this.factService.getFacts(++this.currentPage, this.$stateParams.perPage, this.tag)
                .then((res) => {
                    this.facts = this.facts.concat(res);
                    this.busy = false;
                }).catch(err => {
                    this.busy = false;
                });
        } else {
            this.factService.getSkodaFacts(++this.currentPage, this.skodaPerPage)
                .then((res) => {
                    res.posts.forEach(fact => {
                        fact.content = fact.name;
                        fact.photos = [{image: fact.image}];
                    });
                    this.facts = this.facts.concat(res.posts);
                    this.busy = this.facts.length == res.posts_count;
                }).catch(err => {
                    this.busy = false;
                });
        }
    }
}