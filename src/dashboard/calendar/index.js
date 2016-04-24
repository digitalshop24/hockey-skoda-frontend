'use strict';

import angular from 'angular';
import CalendarCtrl from './controller.js';
import CalendarService from './service.js';

export default angular.module('dashboard.calendar', [])
    .service('calendarService', CalendarService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.calendar', {
                meta: {
                    title: 'Настольный календарь хоккейного болелщика',
                    description: 'Следите за всеми матчами, получайте напоминания в удобное время и не пропускайте ни одной игры!'
                },
                template: require('./template.html'),
                url: '/calendar',
                controller: CalendarCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    calendar: calendarService => {
                        return calendarService.getCalendar();
                    },

                    subscriptions: (session, calendarService) => {
                        if(session.isAuthenticated) {
                            return calendarService.getSubscriptions();
                        }
                        return [];
                    },

                    achievements: ($stateParams, profileService, session) => {
                        if(session.isAuthenticated) {
                            return profileService.getLastAchievements();
                        }
                        return [];
                    },

                    teams: (scheduleService) => {
                        return scheduleService.getTeams();
                    }
                }
            });
    });
