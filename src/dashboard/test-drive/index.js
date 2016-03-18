'use strict';

import angular from 'angular';
import TestDriveCtrl from './controller.js';
import TestDriveService from './service.js';

export default angular.module('dashboard.tdrive', [])
    .service('tdriveService', TestDriveService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.tdrive', {
                template: require('./template.html'),
                url: '/tdrive',
                controller: TestDriveCtrl,
                controllerAs: 'ctrl'
            });
    });
