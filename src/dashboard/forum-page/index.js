'use strict';

import angular from 'angular';
import ForumpageCtrl from './controller.js';
import ForumpageService from './service.js';

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
                    topicsPerPage: 15
                },
                resolve: {
                    topics: ($stateParams, forumpageService) => {
                        return forumpageService.getTopicsBySectionId($stateParams.id, $stateParams.page,
                            $stateParams.topicsPerPage, $stateParams.topicNumber);
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
