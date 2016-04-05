'use strict';


export default class NewspageCtrl {
    constructor(news, session, login, commentsInfo, newspageService, $document) {
        this.news = news;
        this.rubric = news.rubric;
        this.session = session;
        this.login = login;
        this.comments = commentsInfo.comments;
        this.commentsAmount = commentsInfo.comments_count;
        this.newspageService = newspageService;
        this.$document = $document;
        this.rubricState = this.getRubricState(this.rubric.api_path);
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
        this.$document.scrollToElement($('#messageEditor'), 150, 500);
    }

    sendMessage() {
        this.newspageService.sendMessage(this.rubric.api_path, this.news.id, this.message);
    }

    getRubricState(stateApiName) {
        switch (stateApiName) {
            case "blog":
                return "dashboard.blog";
            case "news":
                return "dashboard.general-news";
        }
    }
}