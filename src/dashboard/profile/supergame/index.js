'use strict';

import angular from 'angular';
import SupergameCtrl from './controller.js';
import SupergameService from './service.js';
import SuperFinalService from './superFinalService.js';

export default angular.module('dashboard.profile.supergame', [])
    .service('supergameService', SupergameService)
    .service('superFinalService', SuperFinalService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.supergame', {
                template: require('./template.html'),
                url: '/supergame',
                controller: SupergameCtrl,
                controllerAs: 'ctrl'
            });
    });
