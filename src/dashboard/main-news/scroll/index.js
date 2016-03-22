'use strict';

import angular from "angular";

export default angular.module('dashboard.main-news.scroll', [])
    .directive('mainNewsScroll', function ($rootScope) {
        return {
            scope: {},
            link: function ($scope, $element, $attrs, controller) {

                angular.element(document).ready(() => {

                    $scope.$on('$destroy', function () {
                        $(document).off('scroll', handler);
                    });

                    let lastScrollTop = 0;
                    const handler = (event)=> {
                        if (isTimeline(event.target)) {
                            return;
                        }

                        let st = $(document).scrollTop();
                        let activeDayChanged;
                        const scrollDown = st >= lastScrollTop;
                        if (scrollDown) {
                            activeDayChanged = handleScrollDown();
                        } else if (st < lastScrollTop) {
                            activeDayChanged = handleScrollUp();
                        }
                        if (activeDayChanged) {
                            $rootScope.$broadcast('mainNews:activeDayChanged', {
                                day: currentActiveDay,
                                scrollDown: scrollDown
                            });
                        }
                        lastScrollTop = st;
                    };
                    $(document).on('scroll', handler);

                    $(document).trigger('scroll');

                    let currentActiveDay;
                    let newActiveDay;

                    function handleScrollDown() {
                        const daysWithNews = $($element).find('.row');

                        daysWithNews.each((index) => {
                            const day = daysWithNews.get(index);
                            const elementOffsetTop = $(day).offset().top;
                            const windowMiddle = $(window).scrollTop() + $(window).height() / 2;
                            if (elementOffsetTop < windowMiddle) {
                                newActiveDay = $(day).data("newsId");
                            }
                        });

                        let activeDayChanged = false;
                        if (currentActiveDay != newActiveDay) {
                            currentActiveDay = newActiveDay;
                            activeDayChanged = true;
                        }
                        return activeDayChanged;
                    }

                    function handleScrollUp() {
                        const daysWithNews = $($($element).find('.row').get().reverse());

                        daysWithNews.each((index) => {
                            const day = daysWithNews.get(index);
                            const elementOffsetBottom = $(day).offset().top + $(day).height();
                            const windowMiddle = $(window).scrollTop() + $(window).height() / 2;
                            if (elementOffsetBottom > windowMiddle) {
                                newActiveDay = $(day).data("newsId");
                            }
                        });
                        let activeDayChanged = false;
                        if (currentActiveDay != newActiveDay) {
                            currentActiveDay = newActiveDay;
                            activeDayChanged = true;
                        }
                        return activeDayChanged;
                    }

                    function isTimeline(target) {
                        return target.id == "timeline_wrapp";
                    }

                });


            }
        }
    });