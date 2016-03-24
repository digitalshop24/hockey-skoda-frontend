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
                url: '/forum/topics/:id',
                controller: ForumtopicCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    messagesPerPage: 15
                },
                resolve: {
                    topic: ($stateParams, forumtopicService) => {
                        return forumtopicService.getTopic($stateParams.id);
                    },
                    messages: ($stateParams, forumtopicService) => {
                        return forumtopicService.getTopicMessages($stateParams.id, $stateParams.page,
                            $stateParams.messagesPerPage);
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
