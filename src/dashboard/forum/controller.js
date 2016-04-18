'use strict';


export default class ForumCtrl {
    constructor($state, sectionInfo, page, login, session, allSections, forumService) {
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
        this.allSections = allSections;
        this.session = session;
        this.service = forumService;
    }

    createTopic() {
        this.service.createTopic(this.section.id, this.topicName, this.message).
            then((res) => {
                this.state.go('dashboard.forum',{}, {
                    reload: true
                });
            });
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
    }

    loadMore() {
        this.state.go('dashboard.forum', {
            sections: this.sections,
            page: this.currentPage + 1,
            notScrollToTop: true
        });
    }


}