'use strict';


export default class SocialCtrl {
    constructor(posts, moment) {
        const days = [];
        this.events = posts;
        this.events.forEach(post => {
            post.iconClass = post.network;
            post.repostText = post.reposts + ' ' + this.getRepostText(post.network);

            const temp = moment(post.published_at).format('YYYY-MM-DD');
            var day = days.find(day => day.id == temp);
            if(day) {
                day.events.push(post);
            } else {
                days.push({
                    id: temp,
                    events: [post]
                });
            }
        });
        this.days = days;

        var a = "";
    }

    getRepostText(network) {
        if(network == 'twitter') {
            return 'ретвитов';
        }
        return 'репостов';
    }

}