'use strict';


export default class NewspageCtrl {
    constructor(news) {
        this.news = news;
        this.rubric = news.rubric;
        this.rubricState = this.getRubricState(this.rubric.api_path);
        this.socialShareText = news.title + "\n" + news.description;
        this.socialShareUrl = "https://s3.eu-central-1.amazonaws.com/skodahockey/public/imgpsh_fullsize.jpeg";
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