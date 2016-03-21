'use strict';

import angular from 'angular';
import GeneralNewsCtrl from './controller.js';
import GeneralNewsService from './service.js';
import GeneralNewsLogicService from './generalNewsLogicService.js';
import news from './news/index.js';
import scroll from './scroll/index.js';

export default angular.module('dashboard.general-news',
    [
        news.name,
        scroll.name
    ])
    .service('generalNewsLogicService', GeneralNewsLogicService)
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
                        const monthIndex = $stateParams.month ? $stateParams.month : moment().month() + 1;
                        $stateParams.month = monthIndex;
                        const momentMonthIndex = monthIndex - 1;
                        return newsService.getDaysContainedNewsByDate(moment().month(momentMonthIndex).format('YYYY-MM'));
                    },
                    news: ($stateParams, newsService, daysWithNews, moment) => {
                        if ($stateParams.loadExactlyDayNews) {
                            const momentMonthIndex = $stateParams.month - 1;
                            const dayWithNews = moment().month(momentMonthIndex).date($stateParams.day).format('YYYY-MM-DD');
                            return newsService.getNewsByDate(dayWithNews);
                        } else {
                            if (daysWithNews.length) {
                                const lastDayWithNews = daysWithNews[0];
                                $stateParams.day = moment(lastDayWithNews).date();
                                return newsService.getNewsByDate(lastDayWithNews);
                            }
                            return [];
                        }
                    },
                    month: ($stateParams, news) => {
                        return $stateParams.month;
                    },
                    day: ($stateParams, news) => {
                        return $stateParams.day;
                    }
                },
                url: '/general-news',
                controller: GeneralNewsCtrl,
                controllerAs: 'ctrl'
            });
    });
