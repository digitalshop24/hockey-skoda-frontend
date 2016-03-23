'use strict';

import angular from 'angular';
import NewspageCtrl from './controller.js';
import NewspageService from './service.js';

export default angular.module('dashboard.newspage', [])
    .service('newspageService', NewspageService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.newspage', {
                template: require('./template.html'),
                url: '/news-page',
                controller: NewspageCtrl,
                controllerAs: 'ctrl',
                params: {
                    news: {}
                },
                resolve: {
                    news: ($stateParams) => {
                        return $stateParams.news;
                    }
                }
            });
    });
