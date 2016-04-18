'use strict';


export default class ForumpageCtrl {
    constructor(section, topicInfo, login, session, id, page, $state, forumpageService, $modal, sort, allSections) {
        this.section = section;
        this.tempSection = allSections.find(sect => sect.id == section.id);
        this.topics = topicInfo.topics;
        this.totalPages = topicInfo.total_pages;
        this.login = login;
        this.session = session;
        this.id = id;
        this.currentPage = page;
        this.state = $state;
        this.service = forumpageService;
        this.message = "";
        this.modal = $modal;
        this.sort = sort;
        this.allSections = allSections;
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
    }

    loadMore() {
        this.state.go('dashboard.forum-page', {
            id: this.id,
            page: this.currentPage + 1,
            topics: this.topics
        });
    }

    createTopic() {
        this.service.createTopic(this.section.id, this.topicName, this.message).
            then((res) => {
                this.state.go('dashboard.forum-page', {
                    id: this.id
                }, {
                    reload: true
                });
            });
    }
}