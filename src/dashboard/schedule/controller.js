'use strict';


export default class ScheduleCtrl {
    constructor(schedule, moment, teams, $scope, $interval, scheduleService) {
        this.schedule = schedule;
        this.allTeams = teams.filter(team => team.short_name);
        this.playoffTeams = teams.filter(team => !team.short_name);
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

        const updater = $interval(() => {
            scheduleService.getSchedule().then((res) => {
                this.schedule = res;
            })
        }, 15 * 1000);

        $scope.$on('$destroy', () => {
            $interval.cancel(updater);
        });

        this.filterByAllTeams = (match) => {
            return $scope.ctrl.allTeamsFilter ? (match.redteam.id == $scope.ctrl.allTeamsFilter.id || match.blueteam.id == $scope.ctrl.allTeamsFilter.id)  : true;
        };

        this.filterByPlayoffTeams = (match) => {
            return $scope.ctrl.playoffFilter ? (match.redteam.id == $scope.ctrl.playoffFilter.id || match.blueteam.id == $scope.ctrl.playoffFilter.id)  : true;
        };

        this.filterByCategory = (match) => {
            return $scope.ctrl.categoryFilter ? match.match_group == $scope.ctrl.categoryFilter.id  : true;
        };
    }
}