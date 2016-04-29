'use strict';

import angular from 'angular';
import StaticPageCtrl from './controller.js';

export default angular.module('dashboard.static-page', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.static-page', {
                template: require('./template.html'),
                url: '/page/:id',
                controller: StaticPageCtrl,
                controllerAs: 'ctrl',
                resolve: {

                    post: ($stateParams, newspageService) => {
                        return newspageService.getNewsById("static_pages", $stateParams.id);
                    }
                }
            });
    });