'use strict';

import angular from 'angular';
import KonkurskpkCtrl from './controller.js';
import KonkurskpkService from './service.js';

export default angular.module('dashboard.konkurs-kpk', [])
    .service('konkurs-kpkService', KonkurskpkService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.konkurs-kpk', {
                template: require('./template.html'),
                url: '/konkurs-kpk',
                controller: KonkurskpkCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
