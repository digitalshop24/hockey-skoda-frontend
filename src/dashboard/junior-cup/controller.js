'use strict';


export default class JuniorCtrl {
    constructor(lastNews, galleries) {
        this.lastNews = lastNews;
        this.galleries = galleries;
    }

    openModal(gallery) {
        if (gallery.images.length) {
            this.photos = gallery.images;
            $('#modalPhoto').modal('show');
        }
    }

    prevPhoto() {
        var $item = $('.modal-photo-slider .item');
        var current = $item.filter(':visible').index();
        var lastIndex = $item.last().index();
        $item.eq(current).fadeOut(200, function () {
            if (current == 0) {
                $item.eq(lastIndex).fadeIn(150);
            } else {
                $item.eq(current - 1).fadeIn(150);
            }
        });
    }

    nextPhoto() {
        var $item = $('.modal-photo-slider .item');
        var current = $item.filter(':visible').index();
        var lastIndex = $item.last().index();
        $item.eq(current).fadeOut(200, function () {
            if (current == lastIndex) {
                $item.eq(0).fadeIn(150);
            } else {
                $item.eq(current + 1).fadeIn(150);
            }
        });
    }

    yearIsChecked($event){
        var target=$(event.currentTarget);
        if(!(target.hasClass("year-unit__chosen"))){
            target.addClass("year-unit__chosen");
            target.siblings(".year-unit").removeClass("year-unit__chosen");
        }

    }

    gotoGallery(){
        $(document).ready(function(){
        var e=$(".gallery-row");
        var coords=e.offset().top-100;
        $('body,html').animate({
                scrollTop: coords
            }, 1000);
            return false;
        });
    

    }
    
}







