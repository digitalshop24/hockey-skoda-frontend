'use strict';

import angular from 'angular';
import externalServerError from './external-server-error/index';

export default angular.module('error-pages', [
        externalServerError.name
    ])
    .config($stateProvider => {
        $stateProvider.state('error-pages', {
            abstract: true,
            template: require('./template.jade')
        });
    });