'use strict';


export default class StarsCtrl {
    constructor(newsInfo, page, $state) {
        this.news = newsInfo.posts;
        this.mainNews = this.news.find(news => news.main) || this.news[0];
        this.newsAmount = newsInfo.posts_count;
        this.currentPage = page;
        this.state = $state;
    }

    loadMore() {
        this.state.go('dashboard.stars', {
            news: this.news,
            page: ++this.currentPage
        });
    }
}