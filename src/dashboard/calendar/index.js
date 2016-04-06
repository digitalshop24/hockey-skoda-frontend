'use strict';

import angular from 'angular';
import CalendarCtrl from './controller.js';
import CalendarService from './service.js';

export default angular.module('dashboard.calendar', [])
    .service('calendarService', CalendarService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.calendar', {
                template: require('./template.html'),
                url: '/calendar',
                controller: CalendarCtrl,
                controllerAs: 'ctrl'
            });
    });
