'use strict';

import angular from "angular";

export default angular.module('dashboard.menu-init', [])
    .directive('menuInit', function () {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    initMenu();
                });
            }
        }
    });