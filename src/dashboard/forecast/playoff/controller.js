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
        this.canSendForecast = (match.blueteam && match.redteam) || match.match_group == "third_winner" || match.match_group == "final_winner";


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

        if (match.match_group == "quarter_final") {
            const quarters = this.getQuaters();
            quarters.forEach(oppositeMatch => {
                var find = this.forecastCopy.find(match => match.num == oppositeMatch.num && match.match_group == oppositeMatch.match_group);
                oppositeMatch.teams = find.teams.slice(0);
            });
            quarters.forEach(match => {
                this.removeTeamFromOtherMatch(match);
            });
            this.forecast.firstSemiFinal.teams = [];
            this.forecast.secondSemiFinal.teams = [];
            quarters.forEach(match => {
                if (match.num == 1 || match.num == 2) {
                    match.redteam ? this.forecast.firstSemiFinal.teams.push(match.redteam) : void 0;
                    match.blueteam ? this.forecast.firstSemiFinal.teams.push(match.blueteam) : void 0;
                } else {
                    match.redteam ? this.forecast.secondSemiFinal.teams.push(match.redteam) : void 0;
                    match.blueteam ? this.forecast.secondSemiFinal.teams.push(match.blueteam) : void 0;
                }
            });
        } else if (match.match_group == "semi_final") {
            this.forecast.third_winner.teams = [];
            this.forecast.final.teams = [];
            this.getSemiFinals().forEach(match => {
                match.redteam ? this.forecast.third_winner.teams.push(match.redteam) : void 0;
                match.blueteam ? this.forecast.third_winner.teams.push(match.blueteam) : void 0;

                match.redteam ? this.forecast.final.teams.push(match.redteam) : void 0;
                match.blueteam ? this.forecast.final.teams.push(match.blueteam) : void 0;
            });
        } else if (match.match_group == "final") {
            this.forecast.final_winner.teams = [];
            this.forecast.final.redteam ? this.forecast.final_winner.teams.push(this.forecast.final.redteam) : void 0;
            this.forecast.final.blueteam ? this.forecast.final_winner.teams.push(this.forecast.final.blueteam) : void 0;
        }

    }

    removeTeamFromOtherMatch(match) {
        this.getQuartersOppositeMatches(match).forEach(oppositeMatch => {
            const find = this.forecastCopy.find(match => match.num == oppositeMatch.num && match.match_group == oppositeMatch.match_group);

            if (oppositeMatch.can_predict) {
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
        });
    }

    getMatchArray() {
        const matches = [];
        for (let name in this.forecast) {
            matches.push(this.forecast[name]);
        }
        return matches;
    }

    getQuaters() {
        const matches = this.getMatchArray();
        return matches.filter(match => match.match_group == "quarter_final");
    }

    getSemiFinals() {
        const matches = this.getMatchArray();
        return matches.filter(match => match.match_group == "semi_final");
    }

    getQuartersOppositeMatches(match) {
        const matchNumbers = [1, 2, 3, 4];
        matchNumbers.splice(matchNumbers.indexOf(+match.num), 1);
        return this.getQuaters().filter(match => matchNumbers.indexOf(+match.num) > -1);
    }

    getSemiFinalOppositeMatches(match) {
        const matches = this.getMatchArray();
        const oppositeMatchIndex = match.num == 1 ? 2 : 1;
        return matches.find(match => match.match_group == "semi_final" && match.num == oppositeMatchIndex);
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
            this.state.go('dashboard.forecast.playoff', {}, {reload: true});
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
        if (localStorage["modalSpeedForecast"] == null) {
            localStorage["modalSpeedForecast"] = "showed";
            this.modalSpeed.open({
                resolve: {
                    message: () => {
                        var header = 'Делайте прогнозы и получайте баллы!';
                        var text = 'Вы можете сделать свой прогноз в сетке соревнований ЧМХ 2016. Возможность угадать результат каждого события открывается поэтапно по ходу чемпионата. Чтобы заработать максимальное количество баллов, регулярно посещайте эту страницу и делайте новые прогнозы!';
                        return '<h2>' + header + '</h2><p>' + text + '</p>';
                    }
                },
                windowClass: 'modal-window modal-window_right'
            });
        }
    }
}