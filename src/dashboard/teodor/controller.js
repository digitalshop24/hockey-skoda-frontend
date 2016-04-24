'use strict';


export default class TeodorCtrl {
    constructor(posts, $state, factService, page, perPage, tag) {
        this.posts = posts;
        this.state = $state;
        this.factService = factService;
        this.currentPage = page;
        this.perPage = perPage;
        this.tag = tag;

    }

    readMore(post) {
        this.state.transitionTo('dashboard.teodor', {id: post.post_id}, {notify: false});
        this.currentPost = post;
    }


    loadMore() {
        if (this.busy) return;
        this.busy = true;

        this.factService.getFacts(++this.currentPage, this.perPage, this.tag)
            .then((res) => {
                this.posts = this.posts.concat(res);
                this.busy = false;
            }).catch(err => {
                this.busy = false;
            });

    }
}