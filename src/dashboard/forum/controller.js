'use strict';


export default class ForumCtrl {
    constructor($state, sectionInfo, page, login, session, allSections, forumService, modalSpeed) {
        this.sections = sectionInfo.sections;
        this.sections.forEach((section) => {
            const lastMessage = section.last_message;
            const name = (lastMessage.user.last_name || '') + ' ' + (lastMessage.user.first_name || '');
            section.lastActivityUserName = name;
            section.lastActivityTime = moment(lastMessage.created_at).format('MM.DD h:ss');
        });
        this.currentPage = page;
        this.totalPages = sectionInfo.total_pages;
        this.state = $state;
        this.login = login;
        this.allSections = allSections;
        this.session = session;
        this.service = forumService;
        this.modalSpeed = modalSpeed
    }

    createTopic() {
        this.service.createTopic(this.section.id, this.topicName, this.message).
            then((res) => {
                this.state.go('dashboard.forum',{}, {
                    reload: true
                });
            });
    }

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
    }

    loadMore() {
        this.state.go('dashboard.forum', {
            sections: this.sections,
            page: this.currentPage + 1,
            notScrollToTop: true
        });
    }
    openSpeed() {
        if(localStorage["modalSpeedForum"] == null){
            localStorage["modalSpeedForum"] = "showed";
            this.modalSpeed.open({
              resolve: {
                  message: () => {
                    var header = 'Общайтесь и получайте баллы!';
                    var text = 'За сообщения на форуме вам полагаются баллы. Мы не приветствуем флуд или флейм. Поэтому баллы будут начислять не чаще, чем 1 раз каждые 3 часа. Будьте внимательны, не нарушайте правила форума!';
                    var message = '<h2>' + header + '</h2><p>' + text + '</p>';
                    return message;
                  }
              },
              windowClass: 'modal-window modal-window_right',
            });
            return;
        }
    }


}