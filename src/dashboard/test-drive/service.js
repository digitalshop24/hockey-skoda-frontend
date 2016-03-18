'use strict';

export default class TestDriveService {
    constructor(api) {
        this.api = api;
    }

    sendRequest(data) {
        return this.api.post('/testdrive', data)
            .catch(response => {
                throw response.data.error;
            });
    }
}
