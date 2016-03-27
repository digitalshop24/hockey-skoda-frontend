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
                url: '/password-new',
                controller: PasswordnewCtrl,
                controllerAs: 'ctrl'
            });
    });
