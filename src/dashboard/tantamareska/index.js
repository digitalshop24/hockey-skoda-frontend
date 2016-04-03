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
                template: require('./template.html'),
                url: '/tantamareska',
                controller: TantamareskaCtrl,
                controllerAs: 'ctrl'
            });
    });
