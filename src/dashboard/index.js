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
import forumpage from './forum-page/index';
import forumtopic from './forum-topic/index';
import Login from './login/index';
import Modal from './modal/index';
import newspage from './news-page/index';
import success from './success/index';
import prizenew from './prize-new/index';
import emailnew from './recover-password/index';
import passwordnew from './password-new/index';
import stars from './stars/index';
import score from './schedule/index';
import video from './video/index';
import masonry from './masonry-init/index';


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
        forumpage.name,
        forumtopic.name,
        newspage.name,
        success.name,
        prizenew.name,
        emailnew.name,
        passwordnew.name,
        stars.name,
        score.name,
<<<<<<< HEAD
        video.name
=======
        masonry.name
>>>>>>> refs/remotes/origin/master
    ])
    .service('login', Login)
    .service('modal', Modal)
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
    })
    .config($provide => {
        $provide.decorator('taOptions', ['$delegate', function(taOptions){
            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
                ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
                ['justifyLeft','justifyCenter','justifyRight', 'justifyFull', 'insertLink']
            ];
            return taOptions;
        }]);
    });
