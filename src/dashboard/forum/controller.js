'use strict';


export default class ForumCtrl {
    constructor($state, sections, page, login, session) {
        this.sections = sections;
        this.sections.forEach((section) => {
            const lastActiveTopic = section.recently_active_topics[0];
            const name = (lastActiveTopic.last_active_user.last_name || '') + ' ' + (lastActiveTopic.last_active_user.first_name || '');
            section.lastActivityUserName = name;
            section.lastActivityTime = moment(lastActiveTopic.last_activity).format('MM.DD h:ss');
        });
        this.currentPage = page;
        this.state = $state;
        this.login = login;
        this.session = session;
    }

    loadMore() {
        this.state.go('dashboard.forum', {
            sections: this.sections,
            page: ++this.currentPage,
        });
    }
}