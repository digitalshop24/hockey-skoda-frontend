'use strict';

import angular from 'angular';
import RegsuccessCtrl from './controller.js';
import RegsuccessService from './service.js';

export default angular.module('dashboard.registration-success', [])
    .service('regsuccessService', RegsuccessService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.registration-success', {
                template: require('./template.html'),
                url: '/mail/users/confirmation?confirmation_token=',
                controller: RegsuccessCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    confirmation: (regsuccessService, $stateParams) => {
                        return regsuccessService.confirm($stateParams.confirmation_token);
                    }
                }
            });
    });
