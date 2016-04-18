'use strict';

import angular from 'angular';
import SocialCtrl from './controller.js';
import SocialService from './service.js';


export default angular.module('dashboard.socials', [])
    .service('socialService', SocialService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.socials', {
                meta: {
                    title: 'Личные странички соцсетей любимых хоккеистов',
                    description: 'Следите за своими любимыми игроками не только на новостных порталах, но и в соцсетях. Узнавайте новое «из первых рук»!'
                },
                template: require('./template.html'),
                url: '/socials?hashtag',
                controller: SocialCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    daysAmount: 2
                },
                resolve: {
                    posts: (socialService, $stateParams) => {
                        return socialService.getPosts($stateParams.page, $stateParams.daysAmount, $stateParams.hashtag);
                    },

                    page: $stateParams => {
                        return $stateParams.page;
                    },

                    daysAmount: $stateParams => {
                        return $stateParams.daysAmount;
                    },

                    hashtag: $stateParams => {
                        return $stateParams.hashtag;
                    },

                    hashtags: mainService => {
                        return mainService.getHashtags();
                    }
                }
            });
    });
