'use strict';

import angular from 'angular';
import ProfileCtrl from './controller.js';
import ProfileService from './service.js';

export default angular.module('dashboard.profile', [])
    .service('profileService', ProfileService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile', {
                template: require('./template.html'),
                url: '/profile',
                controller: ProfileCtrl,
                controllerAs: 'ctrl',
                access: {
                    requiresLogin: true
                },
                params: {},
                resolve: {
                    achievements: ($stateParams, profileService) => {
                        return profileService.getAchievements();
                    },
                    lastAchievements: ($stateParams, profileService) => {
                        return profileService.getLastAchievements();
                    },
                    user: (profileService) => {
                        return profileService.getCurrentUser();
                    },
                    hints: (profileService) => {
                        return profileService.getHints();
                    }
                }
            });
    });
