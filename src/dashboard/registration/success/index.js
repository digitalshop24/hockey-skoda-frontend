'use strict';

import angular from 'angular';
import RegsuccessCtrl from './controller.js';
import RegsuccessService from './service.js';

export default angular.module('dashboard.registration.success', [])
    .service('regsuccessService', RegsuccessService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.registration.success', {
                template: require('./template.html'),
                url: '/registration-success',
                controller: RegsuccessCtrl,
                controllerAs: 'ctrl'
            });
    });
