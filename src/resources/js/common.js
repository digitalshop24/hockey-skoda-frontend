function initTimeline() {
    $(function () {
        $('.wrapp_timeline,.wrapp_timeline_main_page,.achif_wrapp').jScrollPane({
                autoReinitialise: true
            }
        );
    });
}

function initMenu() {
    $(function () {
        $('.drilldown').drilldown();
    });
}


function initSlider() {

    $(function () {

        $('.slider-for').slick({
            infinite: true,
            speed: 300,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.slider-nav',
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            vertical: true,
            slidesToScroll: 1,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            arrows: true,
            asNavFor: '.slider-for'
        });


        $('.single-item').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });

        $('.mainpage_news_slider').slick({
            dots: false,
            arrows: false,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

        $('.date_slider_news').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
        });

        // forecast slider
        $('.slider-for_block').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.slider-nav_forecast'
        });

        $('.slider-nav_forecast').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            arrows: true,
            asNavFor: '.slider-for_block'
        });
    });
}
