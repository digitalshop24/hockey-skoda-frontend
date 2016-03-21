'use strict';

import angular from 'angular';

import headerCtrl from './header/controller.js';
import generalNews from './general-news/index';
import mainNews from './main-news/index';
import tdrive from './test-drive/index';
import registration from './registration/index';
import main from './main/index';
import profile from './profile/index';
import forum from './forum/index';
import tantamareska from './tantamareska/index';
import scrollInit from './scroll-init/index.js';
import facts from './interesting-facts/index';


export default angular.module('dashboard',
    [
        tdrive.name,
        registration.name,
        main.name,
        profile.name,
        forum.name,
        tantamareska.name,
        generalNews.name,
        mainNews.name,
        scrollInit.name
        facts.name
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
