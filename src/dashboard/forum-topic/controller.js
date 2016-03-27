'use strict';


export default class ForumtopicCtrl {
    constructor(topic, messageInfo, forumtopicService, messagesPerPage, $state, $stateParams) {
        this.topic = topic;
        this.messages = messageInfo.messages;
        this.isEditorOpen = false;
        this.forumtopicService = forumtopicService;
        this.topicMessagesAmount = topic.messages_count;
        this.page = $stateParams.page;
        this.messagesPerPage = messagesPerPage;
        this.state = $state;
        this.showPagination = topic.messages_count > messagesPerPage;
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
    }

    sendMessage() {
        this.forumtopicService.sendMessage(this.topic.id,this.answer).then((res) =>{
            this.state.go('dashboard.forumtopic', {
                page: undefined
            });
        });
    }

    changePage() {
        this.state.go('dashboard.forumtopic',{
            page: this.page
        });
    }
}