'use strict';


export default class PhotocontestCtrl {
    constructor(photos, generalPhotocontestService) {
        this.photos = photos;
        this.service = generalPhotocontestService;
    }

    likePhoto(photo) {
        this.service.likePhoto(photo.id).then(res => {

        });



	$('.photo-like .fa').click(function() {
        $(this).addClass('fa-heart');
    });
    $('.photokonkurs-item-post-img .fa').click(function() {
        $(this).addClass('fa-heart');
    });
    }

    
}