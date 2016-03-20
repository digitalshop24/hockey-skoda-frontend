'use strict';

import angular from 'angular';
import MainNewsCtrl from './controller.js';
import MainNewsService from './service.js';
import news from './news/index.js';

export default angular.module('dashboard.main-news',
    [
        news.name
    ])
    .service('mainNewsService', MainNewsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.main-news', {
                template: require('./template.html'),
                params: {
                    month: "",
                    daysWithNews: [],
                    day: ""
                },
                resolve: {
                    news: ($stateParams, $location, mainNewsService, moment) => {
                        return mainNewsService.getNewsByDate(moment().format('YYYY-MM-DD')).then(news => {
                            //news = [];
                            if (news.length) {
                                return news;
                            } else {
                                $location.url('/');
                            }
                        });
                    },
                    /*daysWithNews: ($stateParams, newsService) => {
                     if ($stateParams.loadExactlyDayNews) {
                     return [];
                     } else {
                     const monthIndex = $stateParams.month ? $stateParams.month : moment().month();
                     $stateParams.month = monthIndex;
                     return newsService.getDaysContainedNewsByDate(moment().month(monthIndex).format('YYYY-MM'));
                     }
                     }*/
                },
                url: '/main-news',
                controller: MainNewsCtrl,
                controllerAs: 'ctrl'
            });
    });
