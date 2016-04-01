'use strict';


export default class VideoCtrl {
    constructor(videoInfo, page, $state, $scope) {
        this.videos = videoInfo.posts;
        this.currentVideo = this.videos[0];
        this.videoAmount = videoInfo.posts_count;
        this.state = $state;
        this.currentPage = page;
        this.showInfo = true;
        this.scope = $scope;
    }


    playVideo() {
        this.showInfo = false;
        this.player.playVideo();


        this.scope.$on('youtube.player.paused', ($event, player) => {
            console.log("time " + this.player.getCurrentTime());
            console.log("state " + this.player.getPlayerState());
            this.showInfo = true;

            const secondsDuration = moment.duration(this.player.getCurrentTime(), 's');
            const wholeSeconds = secondsDuration.seconds() < 10 ? "0" + secondsDuration.seconds() : secondsDuration.seconds();
            this.videoTime = secondsDuration.minutes() + ":" + wholeSeconds;
        });

        this.scope.$on('youtube.player.playing', ($event, player) => {
            this.showInfo = false;
        });


    }

    loadMore() {
        this.state.go('dashboard.video', {
            videos: this.videos,
            page: ++this.currentPage
        });
    }
}