'use strict';


export default class BlogCtrl {
    constructor(blogsInfo, $state, page, tags, blogService, $stateParams) {
        this.blogs = blogsInfo.posts;
        this.blogsAmount = blogsInfo.posts_count;
        this.state = $state;
        this.currentPage = page;
        this.tags = tags;
        this.blogService = blogService;
        this.busy = false;
        this.$stateParams = $stateParams;
    }

    loadMore() {
        if (this.busy) return;
        this.busy = true;

        if(this.$stateParams.hashtags) {
            this.$stateParams.tags = this.$stateParams.hashtags.split(',');
        }
        this.blogService.getBlogs(++this.currentPage, this.$stateParams.perPage, this.$stateParams.tags)
            .then((res) => {
                this.blogs = this.blogs.concat(res.posts);
                this.busy = false;
            });
    }

    addTagToFilter(tag) {
        if (this.tags.indexOf(tag) == -1) {
            this.tags.push(tag)
        }
        this.state.go('dashboard.blog', {
            tags: this.tags,
            hashtags: this.tags.join(','),
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
            hashtags: this.tags.join(','),
            tagFilter: true,
            page: 1,
            notScrollToTop: false
        },{reload: true});
    }
}