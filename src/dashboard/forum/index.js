'use strict';

import angular from 'angular';
import ForumCtrl from './controller.js';
import ForumService from './service.js';

export default angular.module('dashboard.forum', [])
    .service('forumService', ForumService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forum', {
                template: require('./template.html'),
                url: '/forum',
                controller: ForumCtrl,
                controllerAs: 'ctrl'
            });
    });
