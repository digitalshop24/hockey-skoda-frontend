'use strict';


export default class ScheduleCtrl {
    constructor(schedule, $state, teams, $scope, $interval, scheduleService, stage) {
        this.stage = stage;
        if(this.stage == 'complete') {
            schedule = schedule.reverse();
        }
        this.schedule = schedule;
        this.allTeams = teams.filter(team => team.short_name);
        this.playoffTeams = teams.filter(team => !team.short_name);
        this.$state = $state;
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

    changeStage(stage) {
        this.$state.go('dashboard.schedule',{stage: stage});
    }

}