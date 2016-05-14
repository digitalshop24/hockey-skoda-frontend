'use strict';

export default class CountryService {
    constructor(api) {
        this.api = api;
    }

    getHistory() {
        return this.api.get('/history').then((res) => {
        	console.log(res.data);
            return res.data;
        });
    }
}
