'use strict';

import angular from 'angular';
import EditCtrl from './controller.js';

export default angular.module('dashboard.profile.edit', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.edit', {
                template: require('./template.html'),
                url: '/edit',
                controller: EditCtrl,
                controllerAs: 'ctrl'
            });
    });
