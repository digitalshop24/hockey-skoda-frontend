'use strict';

import angular from 'angular';
import CheerCtrl from './controller.js';
import CheerService from './service.js';

export default angular.module('dashboard.cheer', [])
    .service('cheerService', CheerService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.cheer', {
                template: require('./template.html'),
                url: '/cheerleaders',
                controller: CheerCtrl,
                controllerAs: 'ctrl',
                params: {
                    notScrollToTop: false,
                    page: 1,
                    perPage: 3,
                    news: [],
                    tags: [],
                    tagFilter: false
                },
                resolve: {
                    newsInfo: ($stateParams, cheerService) => {
                        return cheerService.getNews($stateParams.page, $stateParams.perPage, $stateParams.tags)
                            .then((res) => {
                                const news = $stateParams.tagFilter ? [] : $stateParams.news;
                                res.posts = news.concat(res.posts);
                                return res;
                            });
                    },

                    page: ($stateParams) => {
                        return $stateParams.page;
                    },

                    tags: ($stateParams) => {
                        return $stateParams.tags;
                    }
                }
            });
    });
