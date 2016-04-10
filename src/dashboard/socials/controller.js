'use strict';


export default class SocialCtrl {
    constructor(posts, moment, $scope, $localStorage) {
        const days = [];
        this.events = posts;
        this.localStorage = $localStorage;
        this.events.forEach(post => {
            post.iconClass = post.network;
            post.repostText = post.reposts + ' ' + this.getRepostText(post.network);

            const temp = moment(post.published_at).format('YYYY-MM-DD');
            var day = days.find(day => day.id == temp);
            if (day) {
                day.events.push(post);
            } else {
                days.push({
                    id: temp,
                    events: [post]
                });
            }
        });
        this.days = days;

        if(this.localStorage['socials-filters']) {
            ['fbFilter', 'vkFilter', 'twitterFilter', 'instagramFilter'].forEach(filterName => {
                this[filterName] = this.localStorage['socials-filters'][0][filterName];
            });
        } else {
            this.fbFilter = this.vkFilter = this.twitterFilter = this.instagramFilter = true;
        }
        this.allFilter = this.fbFilter && this.vkFilter && this.twitterFilter && this.instagramFilter;
        this.changeFilter();

        this.filterByNetworks = post => {
            return $scope.ctrl.networks.indexOf(post.network) != -1;
        };
    }

    enableOrDisableAll() {
        this.fbFilter = this.allFilter;
        this.vkFilter = this.allFilter;
        this.twitterFilter = this.allFilter;
        this.instagramFilter = this.allFilter;
        this.changeFilter();
    }

    changeFilter() {
        this.networks = [];
        this.fbFilter ? this.networks.push('fb') : null;
        this.vkFilter ? this.networks.push('vk') : null;
        this.twitterFilter ? this.networks.push('twitter') : null;
        this.instagramFilter ? this.networks.push('instagram') : null;

        this.localStorage['socials-filters'] = [];
        const filter = {};
        ['fbFilter', 'vkFilter', 'twitterFilter', 'instagramFilter'].forEach(filterName => {
            filter[filterName] = this[filterName];
        });
        this.localStorage['socials-filters'].push(filter)
    }

    getRepostText(network) {
        if (network == 'twitter') {
            return 'ретвитов';
        }
        return 'репостов';
    }

}