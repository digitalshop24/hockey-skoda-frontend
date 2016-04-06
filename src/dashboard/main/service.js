'use strict';

export default class MainService {
    constructor(api) {
        this.api = api;
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

    getLastNews(rubric, page, amount) {
        return this.api.
            get(`/posts/${rubric}`, {
                params: {
                    per_page: amount,
                    page: page
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
