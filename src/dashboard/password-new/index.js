'use strict';

import angular from 'angular';
import PasswordnewCtrl from './controller.js';
import PasswordnewService from './service.js';

export default angular.module('dashboard.passwordnew', [])
    .service('passwordnewService', PasswordnewService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.passwordnew', {
                template: require('./template.html'),
                url: '/mail/users/password/edit?reset_password_token=',
                controller: PasswordnewCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
