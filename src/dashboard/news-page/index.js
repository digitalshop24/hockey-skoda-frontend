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
                url: '/news-page/:rubric/:id',
                controller: NewspageCtrl,
                controllerAs: 'ctrl',
                params: {
                    rubric: ''
                },
                resolve: {
                    news: ($stateParams, newspageService) => {
                        return newspageService.getNewsById($stateParams.rubric, $stateParams.id);
                    }
                }
            });
    });
