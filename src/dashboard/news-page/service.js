'use strict';

export default class NewspageService {
    constructor(api) {
        this.api = api;
    }

    getNewsById(rubric, id) {
        return this.api.
            get(`/posts/${rubric}/${id}`).then((res) => {
                return res.data;
            });
    }
}
