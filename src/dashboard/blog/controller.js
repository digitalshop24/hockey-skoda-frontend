'use strict';


export default class BlogCtrl {
    constructor(blogs, $state, page, tags) {
        this.blogs = blogs;
        this.state = $state;
        this.currentPage = page;
        this.tags = tags;
    }

    loadMore() {
        this.state.go('dashboard.blog', {
            blogs: this.blogs,
            page: ++this.currentPage,
            tagFilter: false
        });
    }

    addTagToFilter(tag) {
        if (this.tags.indexOf(tag) == -1) {
            this.tags.push(tag)
        }
        this.state.go('dashboard.blog', {
            blogs: this.blogs,
            tags: this.tags,
            tagFilter: true
        });
    }
}