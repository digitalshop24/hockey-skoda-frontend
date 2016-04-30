'use strict';

import angular from 'angular';

import index from './index/index';
import dashboard from './dashboard/index';
import Api from './api';
import errorPages from './error-pages/index';
import session from './auth/session';
import auth from './auth/auth';
import skodaLocalStorage from './auth/dx-localstorage/index';
import config from '../app/config/index';


export default angular.module('app',
    [
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'angularMoment',
        'slick',
        'ngSanitize',
        'textAngular',
        'ngFileUpload',
        '720kb.socialshare',
        'satellizer',
        'youtube-embed',
        'duScroll',
        'angular-timeline',
        'infinite-scroll',
        'ngMask',
        'tandibar/ng-rollbar',
        'angulartics',
        'angulartics.google.analytics',
        'angulartics.google.tagmanager',
        skodaLocalStorage.name,
        errorPages.name,
        index.name,
        dashboard.name
    ])
    .service('api', Api)
    .service('session', session)
    .service('auth', auth)
    .config(($authProvider) => {

        const url = "http://skoda-hockey.herokuapp.com/api/v1";
        $authProvider.facebook({
            scope: ['email', 'public_profile'],
            url: url + '/auth/facebook',
            clientId: '1563436463985643',
            responseType: 'code'
        });

        $authProvider.instagram({
            url: url + '/auth/instagram',
            clientId: '633676f1f025495fba751c8eef59c392',
            scope: ['public_content']
        });


        $authProvider.twitter({
            url: url + '/auth/twitter',
            provider: 'twitter',
            redirectUri: window.location.origin
        });


        $authProvider.oauth2({
            name: 'vk',
            url: url + '/auth/vk',
            clientId: '5367930',
            redirectUri: window.location.origin,
            authorizationEndpoint: 'https://oauth.vk.com/authorize',
            display: 'popup',
            oauthType: '2.0',
            responseType: 'code',
            scope: ['email', 'video']
        });

    })
    .config(($locationProvider, RollbarProvider) => {
        $locationProvider.html5Mode(true);
        NProgress.configure({trickleRate: 0.1, trickleSpeed: 200, showSpinner: false});
        if (location.hostname !== 'localhost') {
            RollbarProvider.init(config.rollbar);
        }
    })
    .config(function ($analyticsProvider) {
        $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
        $analyticsProvider.withBase(true);  /* Records full path */
    })
    .run(amMoment=> {
        amMoment.changeLocale('ru');
    })
    .run(($rootScope, $state, login, session) => {
        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeStart', authHandling);

        function authHandling(event, toState) {
            if (toState.access) {
                if (!session.isAuthenticated) {
                    event.preventDefault();
                    NProgress.done();
                    login.open();
                }
            }
        }
    })
    .run(($rootScope) => {

        $rootScope.$on('$stateChangeSuccess', (event, toState) => {
            if (toState.meta) {
                $rootScope.metaTitle = toState.meta.title;
                $rootScope.metaDescription = toState.meta.description;
            }
        });
    })
    .run(($rootScope) => {

        $rootScope.$on('$stateChangeStart', (event, toState) => {
            if (['dashboard.calendar', 'dashboard.tantamareska', 'dashboard.suggestions',
                    'dashboard.game.sectors' , 'dashboard.game.cubes'].indexOf(toState.name) != -1) {
                $rootScope.viewportContent = "width=1280";
            } else {
                $rootScope.viewportContent = "width=device-width, initial-scale=1.0";
            }
        });
    })
    .run(($rootScope) => {

        $rootScope.$on('$stateChangeStart', (event, toState, params) => {
            if (!params.notScrollToTop) {
                window.scrollTo(0, 0);
            }
        });

        $rootScope.$on('$stateChangeStart', () => {
            NProgress.start();
        });
        $rootScope.$on('$stateChangeSuccess', () => {
            NProgress.done();
        });
        $rootScope.$on('$stateChangeError', () => {
            NProgress.done();
        });
    });
