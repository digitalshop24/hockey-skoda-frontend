'use strict';

import angular from 'angular';
import FaqCtrl from './controller.js';
import FaqService from './service.js';

export default angular.module('dashboard.faq', [])
    .service('faqService', FaqService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.faq', {
                template: require('./template.html'),
                url: '/faq',
                controller: FaqCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
