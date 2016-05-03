'use strict';


export default class HockeyGameCtrl {
    constructor($scope, $interval, hockeyGameService) {

        const achieve = $interval(() => {
            hockeyGameService.getAchieveFor2Minutes();
        }, 120 * 1000);

        $scope.$on('$destroy', () => {
            $interval.cancel(achieve);
        });
    }
}