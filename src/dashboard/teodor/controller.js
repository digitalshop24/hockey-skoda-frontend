'use strict';

export default class TeodorCtrl {
    constructor(posts, $scope, $localStorage, teodorService, page, daysAmount, hashtag, sponsors, children) {
        this.busy = false;
        this.hashtag = hashtag;
        this.page = page;
        this.daysAmount = daysAmount;
        this.days = [];
        this.teodorService = teodorService;
        this.events = posts;
        this.children = children;
        this.localStorage = $localStorage;
        this.handlePosts(this.events);
        this.iceHockeySponsor = sponsors.find(sponsor => sponsor.id == 2);
        this.activeChild = children[0];
        this.responsive = [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1

                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1

                }
            },

            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1

                }
            }

        ];

        if (this.localStorage['socials-filters']) {
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

    chooseChild(child) {
        this.activeChild = child;
    }

    loadMore() {
        if (this.busy) return;
        this.busy = true;
        this.teodorService.getPosts(++this.page, this.daysAmount, this.hashtag).then(posts => {
            if(posts && posts.length) {
                this.handlePosts(posts);
                this.busy = false;
            }
        });
    }

    handlePosts(posts) {
        posts.forEach(post => {
            post.iconClass = post.network;
            post.repostText = post.reposts + ' ' + this.getRepostText(post.network);
            post.likesText = post.likes + ' лайков';
            post.iconUrl = this.getIconUrl(post.network);
            post.content = post.content ? post.content : "";
            post.photoLengthText = post.photos ? (post.photos.length + ' фото') : '';
            const publishTime = post.published_at;
            post.published_at = moment(publishTime).format('DD.MM H:mm');
            if (post.content.length > 300) {
                post.minContent = post.content.substring(0, 300) + '...';
                post.showMinContent = true;
            }

            const temp = moment(publishTime).format('YYYY-MM-DD');
            var day = this.days.find(day => day.id == temp);
            if (day) {
                if(day.coupleNewsBlocks[day.coupleNewsBlocks.length -1].length == 1) {
                    day.coupleNewsBlocks[day.coupleNewsBlocks.length -1].push(post);
                } else {
                    day.coupleNewsBlocks.push([post]);
                }
            } else {
                this.days.push({
                    id: temp,
                    coupleNewsBlocks: [[post]]
                });
            }
        });
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

    getIconUrl(network) {
        switch (network) {
            case 'vk':
                return 'img/resources/img/soc/vk.png';
            case 'facebook':
                return 'img/resources/img/soc/f.png';
            case 'twitter':
                return 'img/resources/img/soc/twiter.png';
            case 'instagram':
                return 'img/resources/img/soc/insta.png';
        }
    }

}