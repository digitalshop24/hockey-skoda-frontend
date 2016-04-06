'use strict';


export default class ForumCtrl {
    constructor($state, sectionInfo, page, login, session) {
        this.sections = sectionInfo.sections;
        this.sections.forEach((section) => {
            const lastMessage = section.last_message;
            const name = (lastMessage.user.last_name || '') + ' ' + (lastMessage.user.first_name || '');
            section.lastActivityUserName = name;
            section.lastActivityTime = moment(lastMessage.created_at).format('MM.DD h:ss');
        });
        this.currentPage = page;
        this.totalPages = sectionInfo.total_pages;
        this.state = $state;
        this.login = login;
        this.session = session;
    }

    loadMore() {
        this.state.go('dashboard.forum', {
            sections: this.sections,
            page: this.currentPage + 1,
            notScrollToTop: true
        });
    }


}