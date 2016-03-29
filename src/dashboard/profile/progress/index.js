'use strict';

import angular from 'angular';
import ProgressCtrl from './controller.js';

export default angular.module('dashboard.profile.progress', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.progress', {
                template: require('./template.html'),
                url: '/progress',
                controller: ProgressCtrl,
                controllerAs: 'ctrl'
            });
    });
