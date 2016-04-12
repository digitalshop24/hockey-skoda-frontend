'use strict';

import angular from 'angular';
import TantamareskaCtrl from './controller.js';
import TantamareskaService from './service.js';
import tantam from './tantam.js';

export default angular.module('dashboard.tantamareska', [
    tantam.name
])
    .service('tanService', TantamareskaService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.tantamareska', {
                meta: {
                    title: 'Забавные и необычные фото с вами в главной роли',
                    description: 'Становитесь главными героями смешных фотографий на хоккейную тематику! Просто загрузите свое фото и вставьте лицо в соответствующее отверстие, чтобы получить действительно смешную картинку.'
                },
                template: require('./template.html'),
                url: '/tantamareska',
                controller: TantamareskaCtrl,
                controllerAs: 'ctrl'
            });
    });
