'use strict';

import angular from 'angular';
import ForumtopicCtrl from './controller.js';
import ForumtopicService from './service.js';
import config from '../../config.json';

export default angular.module('dashboard.forumtopic', [])
    .service('forumtopicService', ForumtopicService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forumtopic', {
                template: require('./template.html'),
                url: '/forum/topics/:id/page/:page',
                controller: ForumtopicCtrl,
                controllerAs: 'ctrl',
                // access: {
                //     requiresLogin: true
                // },
                params: {
                    page: undefined,
                    messagesPerPage: config.forum.messagesPerPage
                },
                resolve: {
                    topic: ($stateParams, forumtopicService) => {
                        return forumtopicService.getTopic($stateParams.id);
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    },
                    messagesPerPage: ($stateParams) => {
                        return $stateParams.messagesPerPage;
                    },
                    messageInfo: ($stateParams, forumtopicService, topic, page) => {
                        const resultPage = $stateParams.page ? $stateParams.page : Math.ceil(topic.messages_count / $stateParams.messagesPerPage);
                        $stateParams.page = resultPage;
                        return forumtopicService.getTopicMessages($stateParams.id, $stateParams.page,
                            $stateParams.messagesPerPage);
                    }
                }
            });
    });
