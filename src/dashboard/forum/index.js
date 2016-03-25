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
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    perPage: 4,
                    topicNumber: 3,
                    sections: []
                },
                resolve: {
                    sectionInfo: ($stateParams, forumService) => {
                        return forumService.getSections($stateParams.page, $stateParams.perPage, $stateParams.topicNumber)
                            .then((res) => {
                                res.sections = $stateParams.sections.concat(res.sections);
                                return res;
                            });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
