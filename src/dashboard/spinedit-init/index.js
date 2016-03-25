'use strict';

import angular from "angular";

export default angular.module('dashboard.spinedit-init', [])
    .directive('spineditInit', function () {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    initSpinedit();
                });
            }
        }
    });