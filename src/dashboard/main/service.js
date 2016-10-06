'use strict';

export default class MainService {
    constructor(api, $http) {
        this.api = api;
        this.http = $http;
    }

    getSlides() {
        return this.api.
            get('/general/slider')
            .then(response => {
                return response.data;
            });
    }

    getHashtags() {
        return this.api.
            get('/general/hashtags')
            .then(response => {
                return response.data;
            });
    }

    getSocPosts() {
        return this.api.
            get('/soc_posts', {
                params: {
                    days: 2,
                    page: 1
                }
            })
            .then(response => {
                return response.data;
            });
    }

    getSchedule(stage) {
        return this.api.
            get('/schedule/index', {
                params: {
                    stage: stage
                }
            })
            .then(response => {
                const matches = [];
                response.data.forEach(day => {
                    matches.push(...day.matches);
                });
                return matches;
            });
    }

    getTeams() {
        return this.api.get('/teams').then(res=> {
            return res.data;
        });
    }

    getLightingNews(amount) {
        return this.api.get("/posts/news/lighting", {
            params: {
                number: amount
            }
        }).then((res) => {
            return res.data;
        });
    }

    getLikeAmount() {
        return this.api.get("/photo_game_posts/likes_count").then((res) => {
            return res.data.total;
        });
    }

    getLastNews(rubric, page, amount, origin, main) {
        return this.api.
            get(`/posts/${rubric}`, {
                params: {
                    per_page: amount,
                    page: page,
                    origin: origin,
                    main: main
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                throw response.data.error;
            });
    }

    getIp(){
        return this.http.get('http://ipv4.myexternalip.com/json')
            .then(function(result) {
               return result.data.ip;
            });
    }

    getSurvey(userIp){
        return this.api.
            get('/survey', {params: {user_ip: userIp}
            })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                throw response.data.error;
            });
    }

    sendSurveyAnswer(survey_id, answer_id, ip){
        return this.api.
            post('/survey/answer', {
                survey_id: survey_id,
                answer_id: answer_id,
                user_ip: ip
            }).then((res) => {
            return res.data;
            }).catch(err => {
                throw err.data;
            });
    }
}
