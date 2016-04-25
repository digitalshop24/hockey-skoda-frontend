'use strict';

const YOUTUBE_PLAYING = 1;
const YOUTUBE_PAUSE = 2;

export default class CheerCtrl {
    constructor(newsInfo, $state, page, tags, $scope, $timeout) {
        this.news = newsInfo.posts;
        this.newsAmount = newsInfo.posts_count;
        this.state = $state;
        this.currentPage = page;
        this.tags = tags;
        this.scope = $scope;
        this.$timeout = $timeout;

        this.teams = [];
        this.news.forEach(news => {
            news.socialUrl = 'https://www.youtube.com/watch?v=' + news.video_code;
            if(this.teams.indexOf(news.short_name) == -1) {
                this.teams.push(news.short_name);
            }
        });
        this.teams.push('Команды будут добавляться');

        this.filterByAllTeams = (post) => {
            return $scope.ctrl.filterTeam ? (post.short_name == $scope.ctrl.filterTeam)  : true;
        };

        this.scope.$on('youtube.player.ready', ($event, player) => {
            const newsId = $('#' + player.id).parent().data('newsId');
            const news = this.news.find(news => news.id == newsId);

            player.addEventListener('onStateChange', (event) => {

                if (event.data == YOUTUBE_PLAYING) {
                    this.$timeout.cancel(news.timer);
                } else if (event.data == YOUTUBE_PAUSE) {

                    news.timer = this.$timeout(() => {
                        news.showVideo = false;
                        const secondsDuration = moment.duration(news.player.getCurrentTime(), 's');
                        const wholeSeconds = secondsDuration.seconds() < 10 ? "0" + secondsDuration.seconds() : secondsDuration.seconds();
                        news.videoTime = secondsDuration.minutes() + ":" + wholeSeconds;
                    }, 3000);

                }
            })
        });
    }

    playVideo(news) {
        news.showVideo = true;
        news.player.playVideo();

        this.scope.$on('youtube.player.playing', ($event, player) => {
            const newsId = $('#' + player.id).parent().data('newsId');
            const news = this.news.find(news => news.id == newsId);
            news.showVideo = true;
        });
    }

    loadMore() {
        this.state.go('dashboard.cheer', {
            news: this.news,
            page: ++this.currentPage,
            notScrollToTop: true
        });
    }

    addTagToFilter(tag) {
        if (this.tags.indexOf(tag) == -1) {
            this.tags.push(tag)
        }
        this.state.go('dashboard.cheer', {
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
        this.state.go('dashboard.cheer', {
            tags: this.tags,
            tagFilter: true,
            page: 1,
            notScrollToTop: false
        },{reload: true});
    }
}