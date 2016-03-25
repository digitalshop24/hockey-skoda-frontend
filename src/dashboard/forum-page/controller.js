'use strict';


export default class ForumpageCtrl {
    constructor(section, topicInfo, login, session, id, page, $state) {
        this.section = section;
        this.topics = topicInfo.topics;
        this.totalPages = topicInfo.total_pages;
        this.login = login;
        this.session = session;
        this.id = id;
        this.currentPage = page;
        this.state = $state;
    }

    loadMore() {
        this.state.go('dashboard.forum-page', {
            id: this.id,
            page: this.currentPage + 1,
            topics: this.topics
        });
    }
}