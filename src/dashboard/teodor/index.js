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
                    title: 'Личные странички соцсетей любимых хоккеистов',
                    description: 'Следите за своими любимыми игроками не только на новостных порталах, но и в соцсетях. Узнавайте новое «из первых рук»!'
                },
                template: require('./template.html'),
                url: '/teodor',
                controller: TeodorCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    daysAmount: 1,
                    hashtag: '#хоккейвкаждом'
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