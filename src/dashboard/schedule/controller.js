'use strict';


export default class ScheduleCtrl {
    constructor(schedule, moment, teams, $scope, $interval, scheduleService) {
        this.schedule = schedule;
        this.currentDay = moment();
        this.teams = teams;
        this.categories = [
            {
                id: "A",
                name: "Группа A"
            },
            {
                id: "B",
                name: "Группа B"
            },
            {
                id: "quarter_final",
                name: "Четвертьфинал"
            },
            {
                id: "semi_final",
                name: "Полуфинал"
            },
            {
                id: "third_place",
                name: "За 3 место"
            },
            {
                id: "final",
                name: "Финал"
            }
        ];

        $interval(() => {
            scheduleService.getSchedule().then((res) => {
                this.schedule = res;
            })
        }, 15 * 1000);

        /* dirty hack */
        this.filterByTeam = (match) => {
            return $scope.ctrl.teamFilter ? (match.redteam_id == $scope.ctrl.teamFilter.id || match.blueteam_id == $scope.ctrl.teamFilter.id)  : true;
        };

        this.filterByCategory = (match) => {
            return $scope.ctrl.categoryFilter ? match.match_group == $scope.ctrl.categoryFilter.id  : true;
        };
    }
}