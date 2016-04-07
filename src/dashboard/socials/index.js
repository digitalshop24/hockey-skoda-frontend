'use strict';

import angular from 'angular';
import SocialCtrl from './controller.js';
import SocialService from './service.js';


export default angular.module('dashboard.socials', [
])
    .service('socialService', SocialService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.socials', {
                template: require('./template.html'),
                url: '/socials',
                controller: SocialCtrl,
                controllerAs: 'ctrl'
            });
    });
