'use strict';

import angular from 'angular';
import MainCtrl from './controller.js';
import MainService from './service.js';
import slider from './slider/slider.js';

export default angular.module('dashboard.main', [
    slider.name
])
    .service('mainService', MainService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.main', {
                meta: {
                    title: 'Болейте, играйте, выигрывайте вместе со ŠKODA! ',
                    description: 'К Чемпионату мира по хоккею ŠKODA приготовила для вас массу интересных призов и активностей! Вперед, вы нужны стране!'
                },
                template: require('./template.html'),
                url: '/',
                controller: MainCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    lastNewsAmount: 25,
                    lightingNewsAmount: 3
                },
                resolve: {
                    mainSlides: mainService => {
                        return mainService.getSlides();
                    },

                    hashtags: mainService => {
                        return mainService.getHashtags();
                    },

                    socPosts: mainService => {
                        return mainService.getSocPosts();
                    },

                    likeAmount: mainService => {
                        return mainService.getLikeAmount();
                    },

                    userIp: mainService => {
                        return mainService.getIp();
                    },

                    lightingNews: ($stateParams, mainService) => {
                        return mainService.getLightingNews($stateParams.lightingNewsAmount);
                    },
                    lastNewsInfo: ($stateParams, mainService) => {
                        return mainService.getLastNews('news', $stateParams.page, $stateParams.lastNewsAmount, null, true);
                    },
                    championatNewsInfo: ($stateParams, mainService) => {
                        return mainService.getLastNews('news', 1, 10, 'championat', null);
                    },
                    starsInfo: ($stateParams, mainService) => {
                        return mainService.getLastNews('stars', 1, 5, null, null);
                    },
                    schedule: mainService => {
                        return mainService.getSchedule('future');
                    },
                    teams: ($stateParams, mainService) => {
                        return mainService.getTeams();
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    },
                    lastNewsAmount: ($stateParams) => {
                        return $stateParams.lastNewsAmount;
                    }
                }
            });
    });
