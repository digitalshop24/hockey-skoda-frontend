'use strict';

import angular from "angular";
import TimelineCtrl from './controller.js';


export default angular.module('dashboard.main-news.timeline', [])
    .directive('mainNewsTimeline', function () {
        return {
            scope: {
                daysWithNews: '='
            },
            bindToController: true,
            template: require('./template.html'),
            controller: TimelineCtrl,
            controllerAs: 'ctrl'
        }
    });