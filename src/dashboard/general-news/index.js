'use strict';

import angular from 'angular';
import GeneralNewsCtrl from './controller.js';
import GeneralNewsService from './service.js';
import GeneralNewsLogicService from './generalNewsLogicService.js';
import news from './news/index.js';
import scroll from './scroll/index.js';
import timeline from './timeline/index.js';

export default angular.module('dashboard.general-news',
    [
        news.name,
        scroll.name,
        timeline.name
    ])
    .service('generalNewsLogicService', GeneralNewsLogicService)
    .service('newsService', GeneralNewsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.general-news', {
                template: require('./template.html'),
                meta: {
                    title: 'Актуальный событийный дайджест',
                    description: 'Просматривайте самые свежие новости об актуальных событиях в мире хоккея.'
                },
                params: {
                    month: "",
                    year: "",
                    daysWithNews: [],
                    day: "",
                    loadExactlyDayNews: false
                },
                resolve: {
                    daysWithNews: ($stateParams, newsService) => {
                        const monthIndex = $stateParams.month ? $stateParams.month : moment().month() + 1;
                        const fullYear = $stateParams.year ? $stateParams.year : moment().year();
                        $stateParams.month = monthIndex;
                        const momentMonthIndex = monthIndex - 1;
                        $stateParams.year = fullYear;
                        return newsService.getDaysContainedNewsByDate(moment().year(fullYear).month(momentMonthIndex).format('YYYY-MM'));
                    },
                    news: ($stateParams, newsService, daysWithNews, moment) => {
                        if ($stateParams.loadExactlyDayNews) {
                            const momentMonthIndex = $stateParams.month - 1;
                            const dayWithNews = moment().year($stateParams.year).month(momentMonthIndex).date($stateParams.day).format('YYYY-MM-DD');
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

                    tweets: newsService => {
                        return newsService.getTweets();
                    },

                    year: ($stateParams, news) => {
                        return $stateParams.year;
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
