'use strict';

import angular from "angular";
import TimelineCtrl from './controller.js';


export default angular.module('dashboard.general-news.timeline', [])
    .directive('generalNewsTimeline', function () {
        return {
            scope: {
                daysWithNews: '='
            },
            bindToController: true,
            template: require('./template.html'),
            controller: TimelineCtrl,
            controllerAs: 'ctrl',
            link: function ($scope) {


                const handler = (event, data) => {

                    data = +data;
                    $scope.$apply(() => {
                        $scope.ctrl.currentDay = data;
                    });

                    const tempData = data >= 5 ? data - 5 : data;
                    var elem = $("div[data-timeline-day-id='" + tempData + "']");
                    if (!elem) {
                        elem = $("div[data-timeline-day-id='" + data + "']");
                    }
                    $('.wrapp_timeline').data('jsp').scrollToElement(elem, false, {animateScroll: true});
                };
                $scope.$on('generalNews:activeDayChanged', handler);
                $scope.$on('$destroy', handler);
            }
        }
    });