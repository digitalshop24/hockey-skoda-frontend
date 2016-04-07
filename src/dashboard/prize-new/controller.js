'use strict';


export default class PrizenewCtrl {
    constructor(sponsors, user, session, login) {
        this.sponsors = sponsors;
        this.user = user;
        this.session = session;
        this.login = login;
        this.currentSponsorIndex = 0;
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
}