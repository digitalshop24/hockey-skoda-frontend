'use strict';

import angular from 'angular';

import index from './index/index';
import dashboard from './dashboard/index';
import Api from './api';
import errorPages from './error-pages/index';
import session from './auth/session';
import auth from './auth/auth';
import skodaLocalStorage from './auth/dx-localstorage/index';


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
        skodaLocalStorage.name,
        errorPages.name,
        index.name,
        dashboard.name
    ])
    .service('api', Api)
    .service('session', session)
    .service('auth', auth)
    .config($authProvider => {

        $authProvider.authToken = '';
        $authProvider.authHeader = 'Auth-Code';
        $authProvider.facebook({
            url: 'http://skoda-hockey.herokuapp.com:80/api/v1/auth/facebook',
            clientId: '1563436463985643',
            responseType: 'token'
        });

        $authProvider.instagram({
            clientId: '633676f1f025495fba751c8eef59c392'
        });

        $authProvider.twitter({
            clientId: '0n8MJuRKkn7PdEnoaK5VZRGmG'
        });

        $authProvider.oauth2({
            name: 'vk',
            url: 'http://skoda-hockey.herokuapp.com:80/api/v1/auth/vk',
            clientId: '5367930',
            redirectUri: window.location.origin,
            authorizationEndpoint: 'https://oauth.vk.com/authorize',
            display: 'popup',
            oauthType: '2.0',
            responseType: 'token',
            scope: ['email']
        });
    })
    .config(($locationProvider) => {
        $locationProvider.html5Mode(true);
        NProgress.configure({trickleRate: 0.1, trickleSpeed: 200, showSpinner: false});
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
            if (['dashboard.forum', 'dashboard.blog', 'dashboard.facts', 'dashboard.stars'].indexOf(toState.name) == -1) {
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