'use strict';


export default class ForumpageCtrl {
    constructor(section, topicInfo, login, session) {
        this.section = section;
        this.topics = topicInfo.topics;
        this.topicsPagesAmount = topicInfo.total_pages;
        this.login = login;
        this.session = session;
    }
}