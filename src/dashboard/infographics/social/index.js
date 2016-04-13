'use strict';

import angular from "angular";

export default angular.module('dashboard.infographics.social', [])
    .directive('socialInit', function () {
        return {
            link: function () {

                angular.element(document).ready(() => {
                    $(document).off('click', '.sharing-link').on('click', '.sharing-link', function(){
                        window.open($(this).attr('href'),"","width=400,height=400");
                        return false;
                    });
                });
            }
        }
    });