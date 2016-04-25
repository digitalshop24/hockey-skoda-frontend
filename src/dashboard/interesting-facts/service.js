'use strict';

import TopicUser from  '../topicUser.js'


export default class FactsService {
    constructor(api) {
        this.api = api;
    }

    getFacts(page, days, hashtag) {
        return this.api.get('/soc_posts',{
            params: {
                page: page,
                days: days,
                hashtag: hashtag
            }
        }).then((res) => {
            return res.data;
        })
    }

    getFactById(id) {
        return this.api.get(`/soc_posts/${id}`).then((res) => {
            return res.data;
        })
    }

    getSkodaFacts(page, perPage) {
        return this.api.
            get('/posts/interesting_facts', {
                params: {
                    page: page,
                    per_page: perPage
                }
            })
            .then(res => {
                return res.data;
            })
            .catch(response => {
                throw response.data.error;
            });
    }
}
