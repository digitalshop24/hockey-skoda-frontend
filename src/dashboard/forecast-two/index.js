'use strict';

import angular from 'angular';
import ForecasttwoCtrl from './controller.js';
import ForecasttwoService from './service.js';

export default angular.module('dashboard.forecasttwo', [])
    .service('forecasttwoService', ForecasttwoService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecasttwo', {
                template: require('./template.html'),
                url: '/forecast-two',
                controller: ForecasttwoCtrl,
                controllerAs: 'ctrl'
            });
    });
