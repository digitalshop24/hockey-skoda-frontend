'use strict';


export default class FactsCtrl {
    constructor(factInfo, page, $state) {
        this.facts = factInfo.posts;
        this.factsAmount = factInfo.posts_count;
        this.state = $state;
        this.currentPage = page;
    }

    loadMore() {
        this.state.go('dashboard.facts', {
            facts: this.facts,
            page: ++this.currentPage,
            notScrollToTop: true
        });
    }
}