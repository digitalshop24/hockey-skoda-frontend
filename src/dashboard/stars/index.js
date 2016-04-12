'use strict';

import angular from 'angular';
import StarsCtrl from './controller.js';
import StarsService from './service.js';

export default angular.module('dashboard.stars', [])
    .service('starsService', StarsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.stars', {
                meta: {
                    title: 'Все о звездах хоккея',
                    description: 'Следите за нашими материалами о любимых звездах хоккея! Мы публикуем самые последние новости из жизни звездных хоккеистов, самые интересные интервью, самые вдохновляющие биографии.'
                },
                template: require('./template.html'),
                url: '/stars',
                controller: StarsCtrl,
                controllerAs: 'ctrl',
                params: {
                    notScrollToTop: false,
                    page: 1,
                    perPage: 15,
                    news: []
                },
                resolve: {
                    newsInfo: ($stateParams, starsService) => {
                        return starsService.getNews($stateParams.page, $stateParams.perPage).then((res) =>{
                            res.posts = $stateParams.news.concat(res.posts);
                            return res;
                        });
                    },

                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
