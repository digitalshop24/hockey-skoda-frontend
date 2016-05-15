'use strict';


export default class NewspageCtrl {
    constructor(news, session, login, commentsInfo, newspageService, $document, page, $state, lastNews, championatNews, $scope, isInterview) {
        this.news = news;
        this.rubric = news.rubric;
        this.session = session;
        this.lastNews = lastNews.reverse();
        this.championatNews = championatNews;
        this.login = login;
        this.comments = commentsInfo.comments;
        this.commentsAmount = commentsInfo.comments_count;
        this.newspageService = newspageService;
        this.$document = $document;
        this.currentPage = page;
        this.state = $state;
        this.isInterview = isInterview;
        this.rubricState = this.getRubricState(this.rubric.api_path);
        this.indexToShowLastNews = this.lastNews.length - 5;
        this.shareData = {
            title: this.news.name,
            description: this.news.short_content
        };
        if(this.rubric.api_path == 'stars') {
            this.championatNews.shuffle()
        }


        this.filterForStarsRubric = (post) => {
            return $scope.ctrl.search ? (post.name.toLowerCase().indexOf($scope.ctrl.search.toLowerCase()) > -1 ||
                post.short_content.toLowerCase().indexOf($scope.ctrl.search.toLowerCase()) > -1)  : true;
        };
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
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
            case "stars":
                return "dashboard.stars";
        }
    }
}