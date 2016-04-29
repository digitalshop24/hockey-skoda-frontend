'use strict';


export default class ForecastCtrl {
    constructor(table, modal, modalSpeed, forecastService, $state) {
        this.table = table;
        this.service = forecastService;
        this.forecast = table.predictions;
        this.copyMatches();
        this.modal = modal;
        this.state = $state;
        this.modalSpeed = modalSpeed;
        this.canSendForecast = false;
    }

    changeSelectTeam(match) {
        this.canSendForecast =  (match.blueteam && match.redteam) || match.match_group == "third_winner" || match.match_group == "final_winner";


        if (this.canSendForecast) {
            if (match.blueteam && match.redteam && match.redteam.id == match.blueteam.id) {
                match.blueteam = undefined;
                this.modal.open({
                    resolve: {
                        message: () => {
                            return '<h4 class = "modal-title">Нельзя выбрать 2 одинаковых команды!</h4>'
                        }
                    }
                });
                this.canSendForecast = false;
            }
        }
        this.removeTeamFromOtherMatch(match);
    }

    removeTeamFromOtherMatch(match) {
        if(match.match_group != "quarter_final") {
            return;
        }
        const oppositeMatch = this.getOppositeMatch(match);
        var find = this.forecastCopy.find(match => match.num == oppositeMatch.num && match.match_group == oppositeMatch.match_group);

        if (oppositeMatch.can_predict) {
            oppositeMatch.teams = find.teams.slice(0);
            const teams = oppositeMatch.teams;
            if (teams) {
                if (match.redteam) {
                    teams.splice(teams.findIndex(team => team.id == match.redteam.id), 1);
                }
                if (match.blueteam) {
                    teams.splice(teams.findIndex(team => team.id == match.blueteam.id), 1);
                }
            }
        }
    }

    getOppositeMatch(match) {
        const matches = [];
        for (let name in this.forecast) {
            matches.push(this.forecast[name]);
        }
        const oppositeMatchIndex = match.num == 1 ? 2 : match.num == 2 ? 1 : match.num == 3 ? 4 : 3;
        return matches.find(match => match.match_group == "quarter_final" && match.num == oppositeMatchIndex);
    }

    sendForecast() {
        const predictions = [];
        for (let matchType in this.forecast) {
            const match = this.forecast[matchType]
            if (!match.disabled && match.can_predict) {
                if ((match.redteam && match.blueteam) || ((match.match_group == "third_winner" || match.match_group == "final_winner") && match.redteam)) {
                    match.redteam_id = match.redteam.id;
                    match.blueteam_id = match.blueteam ? match.blueteam.id : undefined;
                    predictions.push(match);
                }
            }
        }
        this.service.sendPredictions(predictions).then(res => {
            this.state.go('dashboard.forecast.playoff',{}, {reload: true});
        });

    }

    copyMatches() {
        this.forecastCopy = [];
        for (let matchName in this.forecast) {
            if (this.forecast[matchName].teams) {
                this.forecastCopy.push({
                    num: this.forecast[matchName].num,
                    match_group: this.forecast[matchName].match_group,
                    teams: this.forecast[matchName].teams.slice(0)
                });
            }
        }

    }
    openSpeed() {
        if(localStorage["modalSpeedForecast"] == null){
            localStorage["modalSpeedForecast"] = "showed";
            this.modalSpeed.open({
              resolve: {
                  message: () => {
                    var header = 'Делайте прогнозы и получайте баллы!';
                    var text = 'Вы можете сделать свой прогноз в сетке соревнований ЧМХ 2016. Возможность угадать результат каждого события открывается поэтапно по ходу чемпионата. Чтобы заработать максимальное количество баллов, регулярно посещайте эту страницу и делайте новые прогнозы!';
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