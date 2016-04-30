'use strict';

export default class ForumService {
    constructor(api) {
        this.api = api;
    }

    getSections(page, sectionAmount, topicAmount) {
        return this.api.get('/forum/sections', {
            params: {
                page: page,
                topic_number: topicAmount,
                per_page: sectionAmount
            }
        }).then(res=> {
            return res.data;
        })
    }

    getAllSections() {
        return this.api.get('/forum/sections/all').then(res=> {
            return res.data;
        })
    }

    startQuiz() {
        return this.api.post('/forum_victorina/start').then(res=> {
            return res.data;
        }).catch(err => {
            throw err.data;
        });
    }

    checkQuiz(id, answers) {
        return this.api.post(`/forum_victorina/${id}/answer`, {
            answers: answers
        }).then(res=> {
            return res.data;
        }).catch(err => {
            throw err.data;
        });;
    }

    createTopic(sectionId, topicName, message) {
        return this.api.post(`/forum/sections/${sectionId}/topics`, {
            name: topicName,
            message: message
        }).then((res) => {
            return res.data;
        });
    }
}
