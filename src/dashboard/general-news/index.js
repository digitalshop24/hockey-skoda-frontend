'use strict';

import angular from 'angular';
import GeneralNewsCtrl from './controller.js';
import GeneralNewsService from './service.js';
import news from './news/index.js';

export default angular.module('dashboard.general-news',
    [
        news.name
    ])
    .service('newsService', GeneralNewsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.general-news', {
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
                    news: ($stateParams, newsService, daysWithNews, moment) => {
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
                url: '/general-news',
                controller: GeneralNewsCtrl,
                controllerAs: 'ctrl'
            });
    });
