'use strict';


export default class FactsCtrl {
    constructor(facts, page, $state) {
        this.facts = facts;
        this.state = $state;
        this.currentPage = page;
    }

    loadMore() {
        this.state.go('dashboard.facts', {
            facts: this.facts,
            page: ++this.currentPage
        });
    }
}