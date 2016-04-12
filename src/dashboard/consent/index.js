'use strict';

import angular from 'angular';
import ConsentCtrl from './controller.js';
import ConsentService from './service.js';


export default angular.module('dashboard.consent', [])
    .service('consentService', ConsentService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.consent', {
                template: require('./template.html'),
                url: '/consent',
                controller: ConsentCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
