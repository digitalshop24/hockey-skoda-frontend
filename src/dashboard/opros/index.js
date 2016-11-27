'use strict';

import angular from 'angular';
import OprosCtrl from './controller.js';
import OprosService from './service.js';

export default angular.module('dashboard.opros', [])
    .service('oprosService', OprosService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.opros', {
                template: require('./template.html'),
                url: '/opros',
                controller: OprosCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
