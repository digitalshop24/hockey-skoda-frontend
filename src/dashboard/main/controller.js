'use strict';


export default class MainCtrl {
    constructor(lightingNews, lastNewsInfo, mainService, page, lastNewsAmount, starsInfo, schedule,
                $scope, teams, championatNewsInfo, mainSlides, hashtags, socPosts) {
        this.service = mainService;
        this.allTeams = teams.filter(team => team.short_name);
        this.mainSlides = mainSlides;
        this.schedule = schedule;
        this.hashtags = hashtags;

        const temp = [];
        socPosts.forEach(function(post) {
            if(post.network != 'instagram'){
                if(post.content && post.content.length > 300) {
                    post.content = post.content.substring(0, 300) + "...";
                }
                temp.push(post);
            }
        });
        this.socPosts = temp;
        this.lightingNews = lightingNews;
        this.lastNewsInfo = lastNewsInfo;
        this.championatNews = championatNewsInfo.posts;
        this.lastNews = lastNewsInfo.posts.reverse();
        this.stars = starsInfo.posts;
        this.page = page;
        this.lastNewsAmount = lastNewsAmount;
        this.slidesToShow = 5;
        this.indexToShowLastNews = this.lastNews.length - this.slidesToShow;

        /* dirty hack */
        this.filterByTeam = (match) => {
            return $scope.ctrl.teamFilter ? (match.redteam.id == $scope.ctrl.teamFilter.id || match.blueteam.id == $scope.ctrl.teamFilter.id)  : true;
        };
        this.responsive = [
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 695,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }

          ];
        }

    loadMoreNews() {
        /*if ((this.newsCurrentIndex + this.slidesToShow) >= (this.page * this.lastNewsAmount)) {
            this.page++;
            this.service.getLastNews(this.page, this.lastNewsAmount).then((res) => {
                this.lastNews = this.lastNews.concat(res.posts);
            });
        }*/

    }
    openModal(){
        // guest
        this.compHeader = 'КАК ВЫИГРАТЬ автомобиль?';
        this.compText = 'Для начала Вам следует зарегистрироваться или войти в свой профиль. ';
        this.compButton = {
            text : 'Зарегистрироваться',
            link : 'dashboard.registration'
        }
        //user
        this.compHeader = 'КАК ВЫИГРАТЬ автомобиль?';
        this.compText = 'Просим Вас внимательно ознакомиться с правилами розыгрыша. Желаем удачи!';
        this.compButton = {
            text : 'Читать правила',
            link : 'dashboard.registration'
        }
        // $('#modalСompetition').modal('show');
    }
}