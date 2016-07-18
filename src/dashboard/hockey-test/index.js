'use strict';

import angular from 'angular';
import HockeyTestCtrl from './controller.js';
import HockeyTestService from './service.js';


export default angular.module('dashboard.hockey-test', [])
    .service('hockeyTestService', HockeyTestService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.hockey-test', {
                meta: {
                    title: 'Сколько бы получили вы на рынке свободных агентов НХЛ?',
                    description: 'Сколько бы получили вы на рынке свободных агентов НХЛ?'
                },
                template: require('./template.html'),
                url: '/hockey-test',
                controller: HockeyTestCtrl,
                controllerAs: 'ctrl'
            });
    });
