'use strict';

import angular from 'angular';
import ForumCtrl from './controller.js';
import ForumService from './service.js';

export default angular.module('dashboard.forum', [])
    .service('forumService', ForumService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forum', {
                meta: {
                    title: 'Большой форум любителей хоккея',
                    description: 'Общайтесь с любителями хоккея, участвуйте в викторине, обсуждайте матчи и все «околохоккейное» на форуме!'
                },
                template: require('./template.html'),
                url: '/forum',
                controller: ForumCtrl,
                controllerAs: 'ctrl',
                // access: {
                //     requiresLogin: true
                // },
                params: {
                    notScrollToTop: false,
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

                    allSections: forumService => {
                        return forumService.getAllSections();
                    },

                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
