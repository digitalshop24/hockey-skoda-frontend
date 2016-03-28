'use strict';

import angular from 'angular';
import CompanionshipCtrl from './controller.js';
import CompanionshipService from './service.js';
import spin from './spin.js';

export default angular.module('dashboard.forecast.companionship', [
    spin.name
])
    .service('companionshipService', CompanionshipService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecast.companionship', {
                template: require('./template.html'),
                url: '/companionship',
                controller: CompanionshipCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    matches: (companionshipService) => {
                        return companionshipService.getClosestMatches();
                    }
                }
            });
    });
