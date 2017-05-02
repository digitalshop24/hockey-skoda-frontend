'use strict';


export default class ScheduleCtrl {
    constructor(schedule, $state, teams, $scope, $interval, scheduleService, stage, modalSpeed) {
        this.stage = stage;
        this.modalSpeed = modalSpeed;
        if(this.stage == 'complete') {
            schedule = schedule.reverse();
        }
        this.schedule = schedule;
        this.monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
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
            scheduleService.getSchedule(this.stage).then((res) => {
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

    filterMonthName(month) {
        return this.monthNames[new Date(month).getMonth()];
    };
    
    changeStage(stage) {
        this.$state.go('dashboard.schedule',{stage: stage});
    }
    openSpeed() {
        if(localStorage["modalSpeedShedule"] == null){
            localStorage["modalSpeedShedule"] = "showed";
            this.modalSpeed.open({
              resolve: {
                  message: () => {
                    var header = 'Расписание игр';
                    var text = 'В этом разделе сайта вы можете увидеть расписание ближайших матчей.';
                    var message = '<h2>' + header + '</h2><p>' + text + '</p>';
                    return message;
                  }
              },
              windowClass: 'modal-window modal-window_right',
            });
            return;
        }
    }

}