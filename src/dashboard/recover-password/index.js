'use strict';

import angular from 'angular';
import RecoverCtrl from './controller.js';
import RecoverService from './service.js';

export default angular.module('dashboard.recover-password', [])
    .service('recoverService', RecoverService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.recover-password', {
                template: require('./template.html'),
                url: '/recover-password',
                controller: RecoverCtrl,
                controllerAs: 'ctrl'
            });
    });
