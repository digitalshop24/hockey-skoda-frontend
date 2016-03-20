'use strict';

import angular from "angular";
import NewsCtrl from './controller.js';

export default angular.module('dashboard.main-news.directive', [])
    .directive('mainNews', function () {
        return {
            bindToController: true,
            restrict: 'EA',
            replace: true,
            scope: {
                mainNews: '='
            },
            template: require('./template.html'),
            controller: NewsCtrl,
            controllerAs: 'ctrl'
        }
    });