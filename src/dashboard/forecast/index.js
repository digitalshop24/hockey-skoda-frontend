'use strict';

import angular from 'angular';
import ForecastCtrl from './controller.js';
import ForecastService from './service.js';

export default angular.module('dashboard.forecast', [])
    .service('forecastService', ForecastService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecast', {
                template: require('./template.html'),
                url: '/forecast',
                controller: ForecastCtrl,
                controllerAs: 'ctrl'
            });
    });
