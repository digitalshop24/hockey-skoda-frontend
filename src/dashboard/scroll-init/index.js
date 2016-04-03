'use strict';

import angular from "angular";

export default angular.module('dashboard.scroll-init', [])
    .directive('scrollInit', function () {
        return {
            link: function () {
                initTimeline();
            }
        }
    });