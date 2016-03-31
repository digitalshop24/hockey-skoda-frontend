'use strict';

import angular from 'angular';
import VideoCtrl from './controller.js';
import VideoService from './service.js';

export default angular.module('dashboard.video', [])
    .service('videoService', VideoService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.video', {
                template: require('./template.html'),
                url: '/video',
                controller: VideoCtrl,
                controllerAs: 'ctrl'
            });
    });
