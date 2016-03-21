'use strict';

import angular from 'angular';
import FactsCtrl from './controller.js';
import FactsService from './service.js';

export default angular.module('dashboard.facts', [])
    .service('factService', FactsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.facts', {
                template: require('./template.html'),
                url: '/interesting-facts',
                controller: FactsCtrl,
                controllerAs: 'ctrl'
            });
    });
