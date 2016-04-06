'use strict';


export default class NewspageCtrl {
    constructor(news, session, login, commentsInfo, newspageService, $document, page, $state) {
        this.news = news;
        this.rubric = news.rubric;
        this.session = session;
        this.login = login;
        this.comments = commentsInfo.comments;
        this.commentsAmount = commentsInfo.comments_count;
        this.newspageService = newspageService;
        this.$document = $document;
        this.currentPage = page;
        this.state = $state;
        this.rubricState = this.getRubricState(this.rubric.api_path);
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
        this.$document.scrollToElement($('#messageEditor'), 150, 500);
    }

    sendMessage() {
        this.newspageService.sendMessage(this.rubric.api_path, this.news.id, this.message).then((res) => {
            this.state.go('dashboard.newspage', {
                comments: [],
                commentPage: 1,
                notScrollToTop: true
            },{reload:true});
        });
    }

    loadMore() {
        this.state.go('dashboard.newspage', {
            comments: this.comments,
            commentPage: ++this.currentPage,
            notScrollToTop: true
        });
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