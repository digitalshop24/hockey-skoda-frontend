'use strict';

import angular from 'angular';

import headerCtrl from './header/controller.js';
import news from './news/index';
import tdrive from './test-drive/index';
import registration from './registration/index';
import main from './main/index';
import profile from './profile/index';
import forum from './forum/index';

export default angular.module('dashboard',
    [
        news.name,
        tdrive.name,
        registration.name,
        main.name,
        profile.name,
        forum.name
    ])
    .config($stateProvider => {
        $stateProvider
            .state('dashboard', {
                abstract: true,
                views: {
                    '': {
                        template: require('./template.html')
                    },
                    'dashboard-header@dashboard': {
                        template: require('./header/template.html'),
                        controller: headerCtrl,
                        controllerAs: 'ctrl'
                    },
                    'dashboard-footer@dashboard': {
                        template: require('./footer/template.html')
                    }
                }
            });
    });
