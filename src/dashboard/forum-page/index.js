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
                params: {
                    page: 1,
                    topicsPerPage: config.forum.messagesPerPage,
                    topics: []
                },
                resolve: {
                    section: ($stateParams, forumpageService) => {
                        return forumpageService.getForumPage($stateParams.id);
                    },
                    topicInfo: ($stateParams, forumpageService) => {
                        return forumpageService.getTopicsBySectionId($stateParams.id, $stateParams.page,
                            $stateParams.topicsPerPage).then((res) => {
                                res.topics = $stateParams.topics.concat(res.topics);
                                return res;
                            });
                    },
                    page: $stateParams => {
                        return $stateParams.page;
                    },
                    id: $stateParams => {
                        return $stateParams.id;
                    }
                }
            });
    });
