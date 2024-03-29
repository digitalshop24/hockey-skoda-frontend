'use strict';

import angular from 'angular';
import NewspageCtrl from './controller.js';
import NewspageService from './service.js';

export default angular.module('dashboard.newspage', [
])
    .service('newspageService', NewspageService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.newspage', {
                template: require('./template.html'),
                url: '/news-page/:rubric/:id',
                controller: NewspageCtrl,
                controllerAs: 'ctrl',
                params: {
                    notScrollToTop: false,
                    rubric: '',
                    commentPage: 1,
                    commentsPerPage: 40,
                    comments: [],
                    isInterview: false
                },
                resolve: {
                    /* @ngInject */
                    news: ($stateParams, newspageService) => {
                        return newspageService.getNewsById($stateParams.rubric, $stateParams.id);
                    },

                    blogpost: function(newspageService, $stateParams) {
                        return newspageService.getNewsById($stateParams.rubric, $stateParams.id);
                    },

                    lastNews: ($stateParams, newspageService) => {
                        return newspageService.getNews($stateParams.rubric, 1, 20, 'content_manager');
                    },

                    championatNews: ($stateParams, newspageService, news) => {
                        const multiplier = Math.ceil(news.content.length / 1500) * 5;
                        return newspageService.getNews($stateParams.rubric, 1, multiplier);
                    },

                    commentsInfo: ($stateParams, newspageService) => {
                        return newspageService.getComments($stateParams.rubric, $stateParams.id, $stateParams.commentPage, $stateParams.commentsPerPage).then((res) =>{
                            res.comments = $stateParams.comments.concat(res.comments);
                            return res;
                        });
                    },

                    page: ($stateParams) => {
                        return $stateParams.commentPage;
                    },

                    isInterview: ($stateParams) => {
                        return $stateParams.isInterview;
                    }
                },
                meta: {
                    /* @ngInject */
                    title: function(blogpost) {
                        return blogpost.title;
                    },
                    description: function(blogpost) {
                        return blogpost.description;
                    }
                }
            });
    });