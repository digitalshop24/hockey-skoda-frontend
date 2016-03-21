'use strict';

import angular from 'angular';
import MainCtrl from './controller.js';
import MainService from './service.js';

export default angular.module('dashboard.facts', [])
    .service('factsService', FactsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.facts', {
                template: require('./template.html'),
                url: '/interesting-facts',
                controller: FactsCtrl,
                controllerAs: 'ctrl'
            });
    });
