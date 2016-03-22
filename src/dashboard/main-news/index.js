'use strict';

import angular from 'angular';
import MainNewsCtrl from './controller.js';
import MainNewsService from './service.js';
import news from './news/index.js';
import timeline from './timeline/index.js';
import scroll from './scroll/index.js';



export default angular.module('dashboard.main-news',
    [
        news.name,
        timeline.name,
        scroll.name
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
                    daysWithNews: ($stateParams, mainNewsService) => {
                        const monthIndex = moment().month() + 1;
                        $stateParams.month = monthIndex;
                        const momentMonthIndex = monthIndex - 1;
                        return mainNewsService.getDaysContainedNewsByDate(moment().month(momentMonthIndex).format('YYYY-MM'));
                    },
                    news: ($stateParams, $location, mainNewsService, moment) => {
                        return mainNewsService.getNewsByDate(moment().format('YYYY-MM-DD')).then(news => {
                            if (news.length) {
                                return news;
                            } else {
                                $location.url('/general-news');
                            }
                        });
                    }
                },
                url: '/main-news',
                controller: MainNewsCtrl,
                controllerAs: 'ctrl'
            });
    });
