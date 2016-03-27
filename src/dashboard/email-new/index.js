'use strict';

import angular from 'angular';
import EmailnewCtrl from './controller.js';
import EmailnewService from './service.js';

export default angular.module('dashboard.emailnew', [])
    .service('emailnewService', EmailnewService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.emailnew', {
                template: require('./template.html'),
                url: '/email-new',
                controller: EmailnewCtrl,
                controllerAs: 'ctrl'
            });
    });
