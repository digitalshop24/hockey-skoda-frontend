'use strict';

import angular from 'angular';
import moment from 'moment';
import NewsCtrl from './controller.js';
import NewsService from './service.js';
import news from './news/index.js';

export default angular.module('dashboard.news',
    [
        news.name
    ])
    .service('newsService', NewsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.news', {
                template: require('./template.html'),
                params: {
                    month: "",
                    daysWithNews: [],
                    day: "",
                    loadExactlyDayNews: false
                },
                resolve: {
                    daysWithNews: ($stateParams, newsService) => {
                        if ($stateParams.loadExactlyDayNews) {
                            return [];
                        } else {
                            const monthIndex = $stateParams.month ? $stateParams.month : moment().month();
                            $stateParams.month = monthIndex;
                            return newsService.getDaysContainedNewsByDate(moment().month(monthIndex).format('YYYY-MM'));
                        }
                    },
                    news: ($stateParams, newsService, daysWithNews) => {
                        if ($stateParams.loadExactlyDayNews) {
                            const dayWithNews = moment().month($stateParams.month).date($stateParams.day).format('YYYY-MM-DD');
                            return newsService.getNewsByDate(dayWithNews);
                        } else {
                            if (daysWithNews.length) {
                                const lastDayWithNews = daysWithNews[daysWithNews.length - 1];
                                return newsService.getNewsByDate(lastDayWithNews);
                            }
                            return [];
                        }
                    },
                    month: ($stateParams) => {
                        return $stateParams.month;
                    }
                },
                url: '/news',
                controller: NewsCtrl,
                controllerAs: 'ctrl'
            });
    });
