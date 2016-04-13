'use strict';

import angular from 'angular';
import MytestdriveCtrl from './controller.js';
import MytestdriveService from './service.js';

export default angular.module('dashboard.profile.mytestdrive', [])
    .service('mytestdriveService',MytestdriveService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.mytestdrive', {
                template: require('./template.html'),
                url: '/my-testdrive',
                controller: MytestdriveCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    coupons: mytestdriveService => {
                        return mytestdriveService.getCoupons();
                    }
                }
            });
    });
