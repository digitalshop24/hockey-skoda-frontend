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
    })
    .run(amMoment=> {
        amMoment.changeLocale('ru');
    })
    .run(($rootScope, $state, auth) => {
        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeStart', authHandling);

        function authHandling(event, toState) {
            //
        }
    })
    .run(($rootScope) => {

        $rootScope.$on('$stateChangeStart', (event, toState) => {
            if (['dashboard.forum', 'dashboard.blog'].indexOf(toState.name) == -1) {
                window.scrollTo(0, 0);
            }
        });

        $rootScope.$on('$stateChangeError', (err) => {
            console.log("error !!!");
        });
    });