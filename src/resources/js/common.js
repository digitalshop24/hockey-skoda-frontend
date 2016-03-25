/*$(document).ready(function() {
 $('.date_slider').slick();

 $("#owl-main").owlCarousel({
 navigation : true, // Show next and prev buttons
 slideSpeed : 300,
 paginationSpeed : 400,
 singleItem:true,
 navigationText : false
 });

 $("#owl-main-2").owlCarousel({
 navigation : true, // Show next and prev buttons
 slideSpeed : 300,
 paginationSpeed : 400,
 singleItem:true,
 navigationText : false

 });
 });*/

/*$(window).load(function () {
 // masonry start

 $('.grid').masonry({
 // options
 itemSelector: '.grid-item',
 columnWidth: '.grid-item',
 itemSelector: '.grid-item',
 percentPosition: true
 });
 });*/

// function initMobileMenu() {
//     $(function () {
//         $('#mobile_menu').click(function () {
//             $('body').toggleClass('.overflow_hidden');
//         });
//     });
// }



function initTimeline() {
    $(function () {
        $('.wrapp_timeline,.wrapp_timeline_main_page').jScrollPane({
                autoReinitialise: true
            }
        );
    });
}

function initSlider() {
    
    $(function () {
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
            dots: false,
        });

        // forecast slider
        $('.slider-for_block').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: '.slider-nav_forecast',
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

function initMasonry() {
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        itemSelector: '.grid-item',
        percentPosition: true
    });
}

/*$('.box').each(function () {
 //set size
 var th = $(this).height(),//box height
 tw = $(this).width(),//box width
 im = $(this).children('img'),//image
 ih = im.height(),//inital image height
 iw = im.width();//initial image width
 if (ih > iw) {//if portrait
 im.addClass('ww').removeClass('wh');//set width 100%
 } else {//if landscape
 im.addClass('wh').removeClass('ww');//set height 100%
 }
 //set offset
 var nh = im.height(),//new image height
 nw = im.width(),//new image width
 hd = (nh - th) / 2,//half dif img/box height
 wd = (nw - tw) / 2;//half dif img/box width
 if (nh < nw) {//if portrait
 im.css({marginLeft: '-' + wd + 'px', marginTop: 0});//offset left
 } else {//if landscape
 im.css({marginTop: '-' + hd + 'px', marginLeft: 0});//offset top
 }
 });*/

/*$('.single-item').slick({
 infinite: true,
 slidesToShow: 1,
 slidesToScroll: 1
 });

 // form-slider
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
 });*/
