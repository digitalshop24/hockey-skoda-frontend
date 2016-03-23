'use strict';

import angular from 'angular';
import LoginCtrl from './controller.js';


export default angular.module('dashboard.login', [
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.login', {
                template: require('./template.html'),
                url: '/login',
                controller: LoginCtrl,
                controllerAs: 'ctrl',
                params: {
                    message: ''
                },
                resolve: {
                    message: ($stateParams) => {
                        return $stateParams.message;
                    }
                }
            }
            );
    });
