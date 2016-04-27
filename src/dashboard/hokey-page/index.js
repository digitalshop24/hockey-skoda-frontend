'use strict';

import angular from 'angular';
import HokeyPageCtrl from './controller.js';
import HokeyPageService from './service.js';

export default angular.module('dashboard.hokey-page', [])
    .service('hokey-pageService', HokeyPageService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.hokey-page', {
                template: require('./template.html'),
                url: '/hokey-page',
                controller: HokeyPageCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
