'use strict';

import angular from "angular";

export default angular.module('dashboard.main.main-slider-init', [])
    .directive('mainSliderInit', function () {
        return {
            scope: {
                initialSlide: '='
            },
            link: function ($scope) {
                angular.element(document).ready(function () {
                    $('.mainpage_news_slider').slick({
                        slidesToShow: 5,
                        slidesToScroll: 3,
                        initialSlide: $scope.initialSlide,
                        dots: false,
                        arrows: true,
                        infinite: false,
                        responsive: [
                            {
                                breakpoint: 1280,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 2,
                                    infinite: true,
                                    dots: true
                                }
                            },
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    infinite: true,
                                    dots: true
                                }
                            },
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }

                        ]
                    });
                });
            }
        }
    });