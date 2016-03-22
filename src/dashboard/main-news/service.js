'use strict';

export default class MainNewsService {
    constructor(api) {
        this.api = api;
    }

    getNewsByDate(date) {
        return this.api.
            get(`/posts/news/main/${date}`)
            .then(response => {
                return response.data;
            })
            .catch(response => {
                throw response.data.error;
            });
    }


    getDaysContainedNewsByDate(date) {

        return this.api.get(`/posts/news/days_with_news/${date ? date : ''}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                throw response.data.error;
            });
    }
}
