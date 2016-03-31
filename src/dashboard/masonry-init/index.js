'use strict';

import angular from "angular";

export default angular.module('dashboard.masonry-init', [])
    .directive('masonryInit', function () {
        return {
            scope: {
                masonryInit: '@'
            },
            link: function ($scope) {
                angular.element(document).ready(function () {
                    $($scope.masonryInit).masonry({
                        // options
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-item',
                        itemSelector: '.grid-item',
                        percentPosition: true
                    });
                });
            }
        }
    });