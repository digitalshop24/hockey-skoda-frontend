'use strict';


export default class ForumtopicCtrl {
    constructor(topic, messages, forumtopicService) {
        this.topic = topic;
        this.messages = messages;
        this.isEditorOpen = false;
        this.forumtopicService = forumtopicService;
    }

    openEditor() {
        this.isEditorOpen = true;
    }

    sendMessage() {
        console.log(this.answer);
        this.forumtopicService.sendMessage(this.topic.id,this.answer).then((res) =>{
            this.messages.push(res);
            this.isEditorOpen = false;
        });
    }
}