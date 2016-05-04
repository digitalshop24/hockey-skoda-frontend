'use strict';


export default class TopicUser {
    constructor() {
    }

    get name() {
        const lastNameAndFirstName = (this.last_name || '') + " " + (this.first_name || '');
        return lastNameAndFirstName.trim() ? lastNameAndFirstName : this.email;
    }

}