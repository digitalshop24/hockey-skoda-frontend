'use strict';

import angular from 'angular';
import TeodorCtrl from './controller.js';
import TeodorService from './service.js';

export default angular.module('dashboard.teodor', [])
    .service('teodorService', TeodorService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.teodor', {
                meta: {
                    title: 'Выиграй поездку на финал чемпионата мира по хоккею',
                    description: 'Skoda Hockey 2016'
                },
                template: require('./template.html'),
                url: '/teodor',
                controller: TeodorCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    daysAmount: 3,
                    hashtag: '#хоккейвкаждом,#этомояигра'
                },
                resolve: {
                    posts: (teodorService, $stateParams) => {
                        return teodorService.getPosts($stateParams.page, $stateParams.daysAmount, $stateParams.hashtag);
                    },

                    sponsors: (prizenewService) => {
                        return prizenewService.getPrizes();
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