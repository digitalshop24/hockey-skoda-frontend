'use strict';

import angular from 'angular';
import TestDriveCtrl from './controller.js';
import TestDriveService from './service.js';

export default angular.module('dashboard.tdrive', [])
    .service('tdriveService', TestDriveService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.tdrive', {
                meta: {
                    title: 'Тест-драйв SKODA',
                    description: 'Пройдя тест-драйв в любом дилерском центре, вы получите уникальный промокод. Введя этот промокод в личном кабинете и набрав необходимое количество баллов, вы получите право участвовать в суперигре! '
                },
                template: require('./template.html'),
                url: '/tdrive',
                controller: TestDriveCtrl,
                controllerAs: 'ctrl',
                resolve: {

                    cities: (tdriveService) => {
                        return tdriveService.getCities();
                    },

                    cars: (tdriveService) => {
                        return tdriveService.getCars();
                    }
                }
            });
    });
