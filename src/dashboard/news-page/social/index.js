'use strict';

import angular from "angular";

export default angular.module('dashboard.newspage.social', [])
    .directive('socialInit', function () {
        return {
            link: function () {

                angular.element(document).ready(() => {
                    $('.social-likes').socialLikes({
                        forceUpdate: true
                    });
                });
            }
        }
    });