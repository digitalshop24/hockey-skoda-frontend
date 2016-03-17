'use strict';

import angular from 'angular';
import TestDriveCtrl from './controller.js';

export default angular.module('dashboard.tdrive', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.tdrive', {
                template: require('./template.html'),
                url: '/tdrive',
                controller: TestDriveCtrl,
                controllerAs: 'ctrl'
            });
    });
