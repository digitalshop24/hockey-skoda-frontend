'use strict';


export default class ForumpageCtrl {
    constructor(section, topics, login, session) {
        this.section = section;
        this.topics = topics;
        this.login = login;
        this.session = session;
    }
}