'use strict';

import angular from 'angular';
import MainCtrl from './controller.js';
import MainService from './service.js';

export default angular.module('dashboard.main', [])
    .service('mainService', MainService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.main', {
                template: require('./template.html'),
                url: '/',
                controller: MainCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    lastNewsAmount: 15,
                    lightingNewsAmount: 3
                },
                resolve: {
                    lightingNews: ($stateParams, mainService) => {
                        return mainService.getLightingNews($stateParams.lightingNewsAmount);
                    },
                    lastNewsInfo: ($stateParams, mainService) => {
                        return mainService.getLastNews($stateParams.page, $stateParams.lastNewsAmount);
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    },
                    lastNewsAmount: ($stateParams) => {
                        return $stateParams.lastNewsAmount;
                    }
                }
            });
    });
