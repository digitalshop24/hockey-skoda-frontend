'use strict';


export default class BlogCtrl {
    constructor(blogs, $state, page) {
        this.blogs = blogs;
        this.state = $state;
        this.currentPage = page;
    }

    loadMore() {
        this.state.go('dashboard.blog', {
            blogs: this.blogs,
            page: ++this.currentPage
        });
    }
}