'use strict';


export default class ForecastCtrl {
    constructor(table, modal, forecastService) {
        this.table = table;
        this.service = forecastService;
        this.forecast = table.predictions;
        this.copyMatches();
        this.modal = modal;
        this.canSendForecast = false;
    }

    changeSelectTeam(match) {
        this.removeTeamFromOtherMatch(match);


        this.canSendForecast = match.blueteam && match.redteam;
        if (this.canSendForecast) {
            if (match.redteam.id == match.blueteam.id) {
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
    }

    removeTeamFromOtherMatch(match) {
        if(match.match_group != "quarter_final") {
            return;
        }
        const oppositeMatch = this.getOppositeMatch(match);
        const matches = [];
        for (let name in this.forecastCopy) {
            matches.push(this.forecastCopy[name]);
        }
        var find = matches.find(match => match.num == oppositeMatch.num && match.match_group == oppositeMatch.match_group);
        oppositeMatch.teams = JSON.parse(JSON.stringify(find.teams));

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
                if (match.redteam && match.blueteam) {
                    match.redteam_id = match.redteam.id;
                    match.blueteam_id = match.blueteam.id;
                    predictions.push(match);
                }
            }
        }
        this.service.sendPredictions(predictions).then(res => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return '<h4 class = "modal-title">Ваш прогноз успешно отправлен!</h4>'
                    }
                }
            });
        });

    }

    copyMatches() {
        this.forecastCopy = {};
        for (let matchName in this.forecast) {
            this.forecastCopy[matchName] = this.forecast[matchName];
            if (this.forecast[matchName].teams) {
                this.forecastCopy[matchName].teams =  JSON.parse(JSON.stringify(this.forecast[matchName].teams));
            }
        }

    }
}