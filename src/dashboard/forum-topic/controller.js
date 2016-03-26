'use strict';


export default class ForumtopicCtrl {
    constructor(topic, messageInfo, forumtopicService) {
        this.topic = topic;
        this.messages = messageInfo.messages;
        this.isEditorOpen = false;
        this.forumtopicService = forumtopicService;
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
    }

    sendMessage() {
        console.log(this.answer);
        this.forumtopicService.sendMessage(this.topic.id,this.answer).then((res) =>{
            this.messages.push(res);
            this.isEditorOpen = false;
        });
    }
}