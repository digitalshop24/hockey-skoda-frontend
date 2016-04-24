'use strict';

import angular from "angular";

export default angular.module('dashboard.scroll-init', [])
    .directive('scrollInit', function () {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    initTimeline();
                });
            }
        }
    });