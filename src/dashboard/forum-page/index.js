'use strict';

import angular from 'angular';
import ForumpageCtrl from './controller.js';
import ForumpageService from './service.js';
import config from '../../config.json';

export default angular.module('dashboard.forum-page', [])
    .service('forumpageService', ForumpageService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forum-page', {
                template: require('./template.html'),
                url: '/forum/page/:id',
                controller: ForumpageCtrl,
                controllerAs: 'ctrl',
                access: {
                    requiresLogin: true
                },
                params: {
                    page: 1,
                    topicsPerPage: config.forum.messagesPerPage,
                    topics: [],
                    sort: 'last_activity'
                },
                resolve: {
                    section: ($stateParams, forumpageService) => {
                        return forumpageService.getForumPage($stateParams.id);
                    },

                    topicInfo: ($stateParams, forumpageService) => {
                        return forumpageService.getTopicsBySectionId($stateParams.id, $stateParams.page,
                            $stateParams.topicsPerPage, $stateParams.sort).then((res) => {
                                res.topics = $stateParams.topics.concat(res.topics);
                                return res;
                            });
                    },

                    allSections: forumService => {
                        return forumService.getAllSections();
                    },

                    page: $stateParams => {
                        return $stateParams.page;
                    },

                    id: $stateParams => {
                        return $stateParams.id;
                    },

                    sort: $stateParams => {
                        return $stateParams.sort;
                    }
                }
            });
    });
