'use strict';

import angular from 'angular';
import CountryCtrl from './controller.js';
import CountryService from './service.js';

export default angular.module('dashboard.country', [])
    .service('countryService', CountryService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.country', {
                template: require('./template.html'),
                url: '/country',
                controller: CountryCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    history: (countryService) => {
                        return countryService.getHistory();
                    }
                }
            });
    });