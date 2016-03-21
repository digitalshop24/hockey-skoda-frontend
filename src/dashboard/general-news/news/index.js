'use strict';

import angular from "angular";
import NewsCtrl from './controller.js';

export default angular.module('dashboard.general-news.directive', [])
    .directive('generalNews', function () {
        return {
            bindToController: true,
            restrict: 'EA',
            scope: {
                generalNews: '='
            },
            template: require('./template.html'),
            controller: NewsCtrl,
            controllerAs: 'ctrl'
        }
    });