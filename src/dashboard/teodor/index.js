'use strict';

import angular from 'angular';
import TeodorCtrl from './controller.js';
import TeodorService from './service.js';

export default angular.module('dashboard.teodor', [])
    .service('teodorService', TeodorService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.teodor', {
                template: require('./template.html'),
                url: '/teodor',
                controller: TeodorCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
