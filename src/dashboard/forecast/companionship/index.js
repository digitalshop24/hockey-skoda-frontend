'use strict';

import angular from 'angular';
import ForecasttwoCtrl from './controller.js';
import ForecasttwoService from './service.js';

export default angular.module('dashboard.forecast.companionship', [])
    .service('forecasttwoService', ForecasttwoService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecast.companionship', {
                template: require('./template.html'),
                url: '/companionship',
                controller: ForecasttwoCtrl,
                controllerAs: 'ctrl'
            });
    });
