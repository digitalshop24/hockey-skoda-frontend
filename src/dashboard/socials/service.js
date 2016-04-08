'use strict';

export default class SocialService {
    constructor(api, $http) {
        this.api = api;
        this.http = $http;
    }

    getPosts(page, perPage) {

        return this.http.get("https://skoda-hockey-staging.herokuapp.com/api/v1/soc_posts").then(staging => {
            const twitter = staging.data;
            return this.http.get("https://skoda-hockey.herokuapp.com/api/v1/soc_posts").then(master => {
                const vk = master.data;
                twitter.push(...vk);
                twitter.sort((a,b) => {
                   // moment(a.published_at).isAfter(b.published_at)
                    return new Date(b.published_at) - new Date(a.published_at);
                });
                return twitter;
            })

        });

       /* return this.api.get('/soc_posts',{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            return res.data;
        })*/
    }
}
