'use strict';

import angular from 'angular';
import ScheduleCtrl from './controller.js';
import ScheduleService from './service.js';

export default angular.module('dashboard.score', [])
    .service('scheduleService', ScheduleService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.schedule', {
                meta: {
                    title: 'Точное и подробное расписание игр',
                    description: 'В этом разделе сайта вы можете увидеть расписание ближайших матчей.'
                },
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
