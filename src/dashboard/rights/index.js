'use strict';

import angular from 'angular';
import RightsCtrl from './controller.js';
import RightsService from './service.js';


export default angular.module('dashboard.rights', [])
    .service('rightsService', RightsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.rights', {
                template: require('./template.html'),
                url: '/rights',
                controller: RightsCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
