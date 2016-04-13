'use strict';

export default class GeneralNewsService {
    constructor(api) {
        this.api = api;
    }

    getNewsByDate(date) {
        return this.api.
            get('/posts/news,blog', {
                params: {
                    date: date,
                    origin: 'content_manager'
                }
            })
            .then(response => {
                return {
                    id: +date.substring(8),  // YYYY-MM-DD we need only day.
                    news: response.data
                };
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
