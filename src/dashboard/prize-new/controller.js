'use strict';


export default class PrizenewCtrl {
    constructor(sponsors, session, login, id, $state) {
        this.sponsors = sponsors;
        this.allPrizes = sponsors.map(sponsor => {
            sponsor.prizes.forEach(prize => {
                prize.sponsorId = sponsor.id;
                prize.sponsorImage = sponsor.image;
            });
            return sponsor.prizes;
        }).reduce((a,b) => a.concat(b));
        this.$state = $state;
        this.session = session;
        this.login = login;
        this.currentSponsorIndex = id ? sponsors.findIndex(sp => sp.id == id) : 0 ;
        this.currentSponsor = sponsors[this.currentSponsorIndex];
        this.responsive = [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: '.main_slider_priz'

                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    asNavFor: '.main_slider_priz'

                }
            },

            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    asNavFor: '.main_slider_priz'

                }
            }

        ];
        this.responsivePrizes =[
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ];

        $('.main_slider_priz').on('afterChange', (event, slick, currentSlide) => {
            this.currentSponsorIndex = currentSlide;
            this.changeSponsor();
        });
    }

    changeSponsor(sponsor) {
        if(sponsor) {
            const index = this.sponsors.findIndex(x => x.id == sponsor.id);
            $('.main_slider_priz')[0].slick.slickGoTo(index);
            this.currentSponsor = sponsor;
        } else {
            this.currentSponsor = this.sponsors[this.currentSponsorIndex];
        }
    }

    showSponsor(id) {
        $('#modalInfo').modal('hide');
        this.$state.go('dashboard.prizenew', {id: id});
    }

    goToGame() {
        $('#modalInfo').modal('hide');
        this.$state.go('dashboard.game.sectors');
    }


    openInfo(prize){
        this.currentPrize = prize;
      $('#modalInfo').modal('show');
    }
}