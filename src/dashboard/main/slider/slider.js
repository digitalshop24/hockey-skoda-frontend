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
                                breakpoint: 695,
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
                    $('.timeline-slider').slick({
                        slidesToShow: 4,
                        slidesToScroll: 2,
                        infinite: false,
                        responsive: [
                            {
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                }
                            },
                            {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                }
                            }
                        ]
                    });
                    // $('.date_slider_news').slick({
                    //     slidesToShow: 1,
                    //     slidesToScroll: 1,
                    //     dots: true,
                    //     arrows: true,
                    //     infinite: true,
                    //     autoplay: true,
                    //     autoplaySpeed: 7000
                    // });
            });
        }
    }
});