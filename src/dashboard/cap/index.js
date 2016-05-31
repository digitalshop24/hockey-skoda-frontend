'use strict';

import angular from 'angular';
import CapCtrl from './controller.js';
import CapService from './service.js';

export default angular.module('dashboard.cap', [])
    .service('capService', CapService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.cap', {
                template: require('./template.html'),
                url: '/cap',
                controller: CapCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                    return $stateParams.reset_password_token;
    }
    }
    });
    });
