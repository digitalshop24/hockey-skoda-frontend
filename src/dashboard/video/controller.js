'use strict';

const YOUTUBE_PLAYING = 1;
const YOUTUBE_PAUSE = 2;

export default class VideoCtrl {


    constructor(videoInfo, page, $state, $scope, $timeout) {
        this.videos = videoInfo.posts;
        this.videos.forEach((video, index) => {
            video.index = index;
        });
        this.setNewMainVideo(this.videos[0]);
        this.videoAmount = videoInfo.posts_count;
        this.state = $state;
        this.currentPage = page;
        this.showVideoInfo = true;
        this.scope = $scope;
        this.shouldPlayNewVideo = true;
        this.$timeout = $timeout;
        let timer;
        this.scope.$on('youtube.player.ready', ($event, player) => {
            player.cuePlaylist(this.videos.map(video => video.video_code));
            player.addEventListener('onStateChange', (event) => {

                if (event.data == YOUTUBE_PLAYING) {
                    this.$timeout.cancel(timer);
                    this.youtubeClick = true;
                    this.step(event.target.getPlaylistIndex());
                } else if (event.data == YOUTUBE_PAUSE) {

                    this.youtubeClick = true;
                    this.step(event.target.getPlaylistIndex());

                    timer = this.$timeout(() => {
                        this.showVideoInfo = true;
                        this.shouldPlayNewVideo = false;
                        const secondsDuration = moment.duration(this.player.getCurrentTime(), 's');
                        const wholeSeconds = secondsDuration.seconds() < 10 ? "0" + secondsDuration.seconds() : secondsDuration.seconds();
                        this.videoTime = secondsDuration.minutes() + ":" + wholeSeconds;
                    }, 3000);

                }
            })
        });
    }


    playVideo() {
        this.showVideoInfo = false;

        if (this.shouldPlayNewVideo) {
            this.player.playVideoAt(this.currentVideo.index);
        } else {
            this.player.playVideo()
        }

        this.scope.$on('youtube.player.playing', () => {
            this.showVideoInfo = false;
        });
    }

    next() {
        const resultIndex = (this.currentVideo.index < this.videos.length - 1) ? this.currentVideo.index + 1 : 0;
        this.step(resultIndex);
    }

    previous() {
        const resultIndex = (this.currentVideo.index > 0) ? this.currentVideo.index - 1 : this.videos.length - 1;
        this.step(resultIndex);
    }

    step(resultIndex) {
        this.currentVideo = this.videos[resultIndex];
        this.videoTime = undefined;
        if (this.youtubeClick) {
            this.youtubeClick = false;
        } else if (this.showVideoInfo) {
            this.shouldPlayNewVideo = true;
        } else {
            this.player.playVideoAt(resultIndex);
        }
    }

    setNewMainVideo(video) {
        this.showVideoInfo = true;
        this.shouldPlayNewVideo = true;
        this.currentVideo = video;
        this.currentVideo.socialUrl = 'https://www.youtube.com/watch?v=' + this.currentVideo.video_code;
        this.videoTime = undefined;
        if (this.player) {
            this.player.pauseVideo();
        }
        window.scrollTo(0, 0);
    }

    loadMore() {
        this.state.go('dashboard.video', {
            videos: this.videos,
            page: ++this.currentPage
        });
    }
}