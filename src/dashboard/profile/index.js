'use strict';

import angular from 'angular';
import progress from './progress/index';
import edit from './edit/index';
import ProfileCtrl from './controller.js';
import ProfileService from './service.js';


export default angular.module('dashboard.profile', [
    progress.name,
    edit.name
])
    .service('profileService', ProfileService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile', {
                template: require('./template.html'),
                url: '/profile',
                abstract: true,
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
