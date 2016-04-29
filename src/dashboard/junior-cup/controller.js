 'use strict';


export default class JuniorCtrl {
    constructor(lastNews) {
        this.lastNews = lastNews;
        this.photos = {
          one : [
            {url : 'img/resources/img/cheer.jpg'},
            {url : 'img/resources/img/cheer-img.jpg'},
            {url : 'img/resources/img/junior-img1.jpg'},
            {url : 'img/resources/img/junior-img2.jpg'},
            {url : 'img/resources/img/junior-img4.jpg'},
            {url : 'img/resources/img/Layer-37.jpg'}
          ],
          two : [
            {url : 'img/resources/img/junior-img2.jpg'},
            {url : 'img/resources/img/junior-img4.jpg'},
            {url : 'img/resources/img/Layer-37.jpg'}
          ]
        };
        this.photos = [
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0001.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0008.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0009.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0021.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0022.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0025.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0028.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0030.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0031.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0032.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0040.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0046.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0048.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0049.jpg'
          },
          {
            type : 1,
            url :'img/resources/img/junior/1/RUS_0052.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7776.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7787.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7793.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7794.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7798.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7806.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7812.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7867.jpg'
          },
          {
            type : 2,
            url :'img/resources/img/junior/2/RUS_7870.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0001.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0002.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0003.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0004.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0005.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0006.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0007.jpg'
          },
          {
            type : 3,
            url :'img/resources/img/junior/3/RUS_0011.jpg'
          },

        ]
    }

    openModal(type){
      this.type = type;
      $('#modalPhoto').modal('show');
    }
    prevPhoto(){
      var $item = $('.modal-photo-slider .item');
      var current = $item.filter(':visible').index();
      var lastIndex = $item.last().index();
      $item.eq(current).fadeOut(200,function(){
        if(current==0){
          $item.eq(lastIndex).fadeIn(150);
        }else{
          $item.eq(current-1).fadeIn(150);
        }
      });
    }
    nextPhoto(){
      var $item = $('.modal-photo-slider .item');
      var current = $item.filter(':visible').index();
      var lastIndex = $item.last().index();
      $item.eq(current).fadeOut(200,function(){
        if(current==lastIndex){
          $item.eq(0).fadeIn(150);
        }else{
          $item.eq(current+1).fadeIn(150);
        }
      });
    }
}