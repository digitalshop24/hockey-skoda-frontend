'use strict';

import angular from 'angular';
import PogruzheniePageCtrl from './controller.js';
import PogruzheniePageService from './service.js';

export default angular.module('dashboard.pogruzhenie', [])
    .service('pogruzhenieService', PogruzheniePageService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.pogruzhenie', {
                template: require('./template.html'),
                url: '/pogruzhenie',
                controller: PogruzheniePageCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
