'use strict';

import TopicUser from  '../topicUser.js'


export default class ForumtopicService {
    constructor(api) {
        this.api = api;
    }

    getTopic(id) {
        return this.api.get(`/forum/topics/${id}`).then((res) => {
            res.data.last_active_user = Object.assign(new TopicUser(), res.data.last_message.user);
            return res.data;
        })
    }

    vote(id, mark) {
        return this.api.post(`/forum/messages/${id}/vote`, {
            value: mark
        }).then((res) => {
            return res.data;
        })
    }

    getTopicMessages(id, page, perPage) {
        return this.api.get(`/forum/topics/${id}/messages`, {
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            res.data.messages.forEach((message) => {
                message.user = Object.assign(new TopicUser(), message.user);
            });
            return res.data;
        })
    }

    sendMessage(id, message) {
        return this.api.post(`/forum/topics/${id}/messages`, {
            message: message
        }).then((res) => {
            return res.data;
        })
    }

    getIp(){
        return this.http.get('http://ipv4.myexternalip.com/json')
            .then(function(result) {
                return result.data.ip;
            });
    }

    getSurvey(userIp){
        return this.api.
            get('/survey', {params: {user_ip: userIp}
            })
            .then(response => {
                return response.data;
            })
            .catch(response => {
                throw response.data.error;
            });
    }

    sendSurveyAnswer(survey_id, answer_id, ip){
        return this.api.
            post('/survey/answer', {
                survey_id: survey_id,
                answer_id: answer_id,
                user_ip: ip
            }).then((res) => {
                return res.data;
            }).catch(err => {
                throw err.data;
            });
    }
}
