'use strict';

import angular from "angular";
import TimelineCtrl from './controller.js';


export default angular.module('dashboard.main-news.timeline', [])
    .directive('mainNewsTimeline', function () {
        return {
            scope: {
                daysWithNews: '='
            },
            bindToController: true,
            template: require('./template.html'),
            controller: TimelineCtrl,
            controllerAs: 'ctrl',
            link: function ($scope) {


                $scope.$on('mainNews:activeDayChanged', (event, data) => {

                    const day = +data.day;
                    $scope.$apply(() => {
                        $scope.ctrl.currentDay = day;
                    });
                    let tempData;
                    if(data.scrollDown) {
                        tempData = day >= 4 ? day - 3 : day;
                    } else {
                        tempData = day <= 25 ? day + 3 : day;
                    }
                    var elem = $("div[data-timeline-day-id='" + tempData + "']");
                    if (!elem) {
                        elem = $("div[data-timeline-day-id='" + data + "']");
                    }
                    $('.wrapp_timeline_main_page').data('jsp').scrollToElement(elem, false, {animateScroll: true});
                });


            }
        }
    });