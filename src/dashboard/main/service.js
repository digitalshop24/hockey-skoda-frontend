'use strict';

export default class MainService {
    constructor(api) {
        this.api = api;
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

    getLastNews(rubric, page, amount, origin) {
        return this.api.
            get(`/posts/${rubric}`, {
                params: {
                    per_page: amount,
                    page: page,
                    origin: origin
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                throw response.data.error;
            });
    }
}
