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
import sliderInit from './slider-init/index.js';
import facts from './interesting-facts/index';
import blog from './blog/index';
import forecast from './forecast/index';
import prize from './prize/index';
import regsuccess from './regsuccess/index';
import forumpage from './forum-page/index';
import forumtopic from './forum-topic/index';


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
        scrollInit.name,
        sliderInit.name,
        facts.name,
        blog.name,
        forecast.name,
        prize.name,
        regsuccess.name,
        forumpage.name,
        forumtopic.name
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
