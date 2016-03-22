'use strict';

import angular from 'angular';
import RegistrationCtrl from './controller.js';
import RegistrationService from './service.js';
import success from './success/index';


export default angular.module('dashboard.registration', [
    success.name
])
    .service('regService', RegistrationService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.registration', {
                template: require('./template.html'),
                url: '/registration',
                controller: RegistrationCtrl,
                controllerAs: 'ctrl'
            });
    });
