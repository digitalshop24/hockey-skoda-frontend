'use strict';


export default class PrizenewCtrl {
    constructor() {
    	 this.responsive = [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor:'.main_slider_priz'
                
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor:'.main_slider_priz'
                
              }
            },
            
            {
              breakpoint: 530,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor:'.main_slider_priz'

              }
            }
            
          ];
    }
}