'use strict';

export default class ProfileService {
    constructor(api) {
        this.api = api;
    }

    update(data) {
        return this.api.put('/users/edit',data).then((res) => {
            return res.data;
        })
    }
}
