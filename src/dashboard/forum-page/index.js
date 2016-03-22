'use strict';

import angular from 'angular';
import ForumpageCtrl from './controller.js';
import ForumpageService from './service.js';

export default angular.module('dashboard.forumpage', [])
    .service('forumpageService', ForumpageService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forumpage', {
                template: require('./template.html'),
                url: '/forum-page',
                controller: ForumpageCtrl,
                controllerAs: 'ctrl'
            });
    });
