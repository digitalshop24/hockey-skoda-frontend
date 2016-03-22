'use strict';

import angular from 'angular';
import ForumtopicCtrl from './controller.js';
import ForumtopicService from './service.js';

export default angular.module('dashboard.forumtopic', [])
    .service('forumtopicService', ForumtopicService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forumtopic', {
                template: require('./template.html'),
                url: '/forum-topic',
                controller: ForumtopicCtrl,
                controllerAs: 'ctrl'
            });
    });
