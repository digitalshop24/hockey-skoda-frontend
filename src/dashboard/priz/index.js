'use strict';

import angular from 'angular';
import PrizCtrl from './controller.js';
import PrizService from './service.js';

export default angular.module('dashboard.priz', [])
    .service('prizService', PrizService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.priz', {
                template: require('./template.html'),
                url: '/priz',
                controller: PrizCtrl,
                controllerAs: 'ctrl'
            });
    });
