'use strict';

import angular from 'angular';
import ScheduleCtrl from './controller.js';
import ScheduleService from './service.js';

export default angular.module('dashboard.score', [])
    .service('scheduleService', ScheduleService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.schedule', {
                template: require('./template.html'),
                url: '/schedule',
                controller: ScheduleCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    schedule: (scheduleService) => {
                        return scheduleService.getSchedule();
                    },

                    teams: (scheduleService) => {
                        return scheduleService.getTeams();
                    }
                }
            });
    });
