'use strict';


export default class NewspageCtrl {
    constructor(news) {
        this.news = news;
        this.rubric = news.rubric;
        this.rubricState = this.getRubricState(this.rubric.api_path);
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