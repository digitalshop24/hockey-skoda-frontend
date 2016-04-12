'use strict';

import angular from 'angular';
import MytestdriveCtrl from './controller.js';

export default angular.module('dashboard.profile.mytestdrive', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.mytestdrive', {
                template: require('./template.html'),
                url: '/my-testdrive',
                controller: MytestdriveCtrl,
                controllerAs: 'ctrl'
            });
    });
