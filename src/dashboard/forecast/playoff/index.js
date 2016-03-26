'use strict';

import angular from 'angular';
import ForecastCtrl from './controller.js';
import ForecastService from './service.js';

export default angular.module('dashboard.forecast.playoff', [])
    .service('forecastService', ForecastService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecast.playoff', {
                template: require('./template.html'),
                url: '',
                controller: ForecastCtrl,
                controllerAs: 'ctrl'
            });
    });
