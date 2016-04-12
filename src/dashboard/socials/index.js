'use strict';

import angular from 'angular';
import SocialCtrl from './controller.js';
import SocialService from './service.js';


export default angular.module('dashboard.socials', [])
    .service('socialService', SocialService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.socials', {
                template: require('./template.html'),
                url: '/socials?hashtag',
                controller: SocialCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    daysAmount: 1
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
                    }
                }
            });
    });
