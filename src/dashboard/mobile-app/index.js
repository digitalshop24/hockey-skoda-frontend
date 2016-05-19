'use strict';

import angular from 'angular';
import mobileappCtrl from './controller.js';

export default angular.module('dashboard.mobileapp', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.mobileapp', {
            	meta: {
                    title: '2016 IIHF POWERED BY ŠKODA',
                    description: 'Официальное приложение ЧМХ 2016. Весь чемпионат в твоем смартфоне!'
                },
                template: require('./template.html'),
                url: '/mobile',
                controller: mobileappCtrl,
                controllerAs: 'ctrl',
            });
    });