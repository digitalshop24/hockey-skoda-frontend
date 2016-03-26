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
        skodaLocalStorage.name,
        errorPages.name,
        index.name,
        dashboard.name
    ])
    .service('api', Api)
    .service('session', session)
    .service('auth', auth)
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
                if(!session.isAuthenticated) {
                    event.preventDefault();
                    NProgress.done();
                    login.open();
                }
            }
        }
    })
    .run(($rootScope) => {

        $rootScope.$on('$stateChangeStart', (event, toState) => {
            if (['dashboard.forum', 'dashboard.blog', 'dashboard.facts'].indexOf(toState.name) == -1) {
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