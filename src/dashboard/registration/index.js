'use strict';

import angular from 'angular';
import RegistrationCtrl from './controller.js';
import RegistrationService from './service.js';


export default angular.module('dashboard.registration', [
])
    .service('regService', RegistrationService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.registration', {
                template: require('./template.html'),
                url: '/registration',
                controller: RegistrationCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    brands: regService => {
                        return regService.getBrands();
                    },

                    skodaCars: regService => {
                        return regService.getSkodaCars();
                    }
                }
            });
    });
