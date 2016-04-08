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
        'youtube-embed',
        'duScroll',
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
            scope: ['email', 'public_content']
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