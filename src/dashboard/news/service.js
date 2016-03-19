'use strict';

export default class NewsService {
    constructor(api) {
        this.api = api;
    }

    getNewsByDate(date) {
        return this.api.get('/posts/news',
            {
                params: {
                    date: date
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                throw response.data.error;
            });
    }

    getDaysContainedNewsByDate(date) {

        return this.api.get(`/posts/news/${date ? date : ''}`,
            {
                params: {
                    date: date
                }
            })
            .then(response => {
                return response.data;
            }).catch(response => {
                throw response.data.error;
            });
    }
}
