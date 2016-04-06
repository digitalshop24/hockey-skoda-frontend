'use strict';


export default class BlogCtrl {
    constructor(blogsInfo, $state, page, tags) {
        this.blogs = blogsInfo.posts;
        this.blogsAmount = blogsInfo.posts_count;
        this.state = $state;
        this.currentPage = page;
        this.tags = tags;
    }

    loadMore() {
        this.state.go('dashboard.blog', {
            blogs: this.blogs,
            page: ++this.currentPage,
            tagFilter: false,
            notScrollToTop: true
        });
    }

    addTagToFilter(tag) {
        if (this.tags.indexOf(tag) == -1) {
            this.tags.push(tag)
        }
        this.state.go('dashboard.blog', {
            tags: this.tags,
            tagFilter: true,
            page: 1,
            notScrollToTop: false
        },{reload: true});
    }

    removeTag(tag) {
        const index = this.tags.indexOf(tag);
        if (index != -1) {
            this.tags.splice(index,1);
        }
        this.state.go('dashboard.blog', {
            tags: this.tags,
            tagFilter: true,
            page: 1,
            notScrollToTop: false
        },{reload: true});
    }
}