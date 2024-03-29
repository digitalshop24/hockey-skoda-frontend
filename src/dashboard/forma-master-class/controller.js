'use strict';


export default class FormaMasterClassCtrl {
    constructor(auth, modal, session, profileService, $state, day_nums) {
        this.auth = auth;
        this.modal = modal;
        this.profileService = profileService;
        this.state = $state;
        this.master_class_data = {};
        this.show_registration = (day_nums.day_1 < 45 || day_nums.day_2 < 45);
        if (day_nums.day_1 < 45) {
            this.master_class_data['2017-04-22'] = '22 Апреля. 15.30 – 16.30 (для детей 10-12 лет)'
        }
        if (day_nums.day_2 < 45) {
            this.master_class_data['2017-04-23'] = '23 Апреля. 17.00 – 18.00 (для детей 7-9 лет)'
        }
        this.forma = {};
        this.forma.can_play = false;
        this.forma.can_skate = false;
        this.forma.has_equipment = false;
        this.session = session;
    }

    openModal() {
        this.modal.open({
                resolve: {
                    message: () => {
                        return '<p style="text-align:left;">Обеспечение конфиденциальности и целостности персональных данных, защита персональных данных при их обработке являются для ООО «ФОЛЬКСВАГЕН Груп Рус» приоритетом. Настоящим мы гарантируем, что предоставляемые Вами персональные данные будут нами обработаны исключительно при условии соблюдения всех требований законодательства РФ о персональных данных. Собираемые персональные данные будут записываться, систематизироваться, накапливаться, храниться, уточняться и извлекаться с использованием баз данных, расположенных на территории Российской Федерации. <br> В случае если Вы согласны на обработку ООО «ФОЛЬКСВАГЕН Груп Рус» Ваших персональных данных, просим подтвердить Ваше согласие, поставив «V» в поле «Согласие на обработку персональных данных и получение информации от ŠKODA». <br> Подтверждая согласие на обработку персональных данных, я разрешаю ООО «ФОЛЬКСВАГЕН Груп Рус» (248926, Калужская обл., г. Калуга, ул. Автомобильная, д. 1), филиалу ООО «ФОЛЬКСВАГЕН Груп Рус» в г. Москве (117485, г. Москва, ул. Обручева, д. 30/1), а также по их поручению третьим лицам осуществлять обработку моих персональных данных (фамилия, имя, отчество, телефон; адрес электронной почты, контактный адрес, возраст, семейное положение, марка автомобиля), включая сбор, систематизацию, накопление, хранение, уточнение, использование, распространение (в том числе трансграничную передачу), обезличивание, уничтожение персональных данных, с целями учета предоставленной мной информации в базах данных; проведения статистических исследований, а также исследований, направленных на улучшение качества продукции и услуг; проведения маркетинговых программ, в том числе для продвижения товаров, работ, услуг на рынке; информирования меня о товарах и услугах ООО «ФОЛЬКСВАГЕН Груп Рус» и его партнеров (например, посредством отправки журналов, отправки приглашений на презентации продуктов, сообщений о технических нововведениях, условиях покупки нового автомобиля и т.д.) с помощью различных средств связи (почтовая рассылка, электронная почта, телефон, SMS-/MMS-сообщения, сообщения посредством информационно-коммуникационных сервисов (Viber, WhatsUp и прочие). В целях проведения маркетинговых программ, в том числе для продвижения товаров, работ и услуг, ООО «ФОЛЬКСВАГЕН Груп Рус» может заключать соответствующие Договоры с третьими лицами относительно условий предоставления мне финансовых услуг. Подписанием настоящего документа я даю свое согласие на получение информации о предлагаемых такими третьими лицами финансовых услугах. Указанная информация может быть доведена до моего сведения как ООО «ФОЛЬКСВАГЕН Груп Рус», так и самими компаниями-партнерами ООО «ФОЛЬКСВАГЕН Груп Рус», предлагающими такие финансовые услуги, включая следующие: ООО «Фольксваген Банк РУС» (117485, г. Москва, ул. Обручева, д. 30/1, стр.1, ИНН: 7750005605, лицензия ЦБ РФ №3500), ООО «ФВ Груп Финанц» (Россия, 107045, г. Москва, ул. Трубная, 12, ИНН: 7702349370); ООО «Фольксваген Финансовые Услуги РУС» (Россия, 107045, г. Москва, ул. Трубная, 12, ИНН: 7702656396. Полный перечень компаний–партнеров ООО «ФОЛЬКСВАГЕН Груп Рус» в области предоставления финансовых услуг размещен на сайте www.skoda-avto.ru в разделе ŠKODA Financial Services. Настоящее согласие на обработку персональных данных действует до момента его отзыва в соответствии со статьей 9 Федерального закона от 27.07.2006 г. №152-ФЗ «О персональных данных» посредством предоставления письменного заявления по почтовому адресу Филиала ООО «ФОЛЬКСВАГЕН Груп Рус» в г. Москве (г. Москва, ул. Обручева, д. 30/1, с пометкой «для службы безопасности») или в электронной форме посредством заполнения специальной формы «Обратная связь» на сайте www.skoda-avto.ru.</p>'
                    }
                }
        });
    }

    send() {
        if (this.form.password != this.form.confirmPassword) {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Введенные пароли не совпадают!'
                    }
                }
            });
            return;
        }

        this.auth.register({
            email: this.form.email,
            password: this.form.password,
            policy_agreed: this.form.policy_agreed,
        }).then(() => {
            delete this.form.email;
            delete this.form.password;
            delete this.form.confirmPassword;
            return this.profileService.update(this.form);
        }).then(() => {
            this.forma["parent_first_name"] = this.form.first_name;
            this.forma["parent_last_name"] = this.form.last_name;
            this.forma["parent_middle_name"] = this.form.middle_name;
            this.profileService.create_forma_master_class(this.forma);
        }).then(() => {
            this.form = {};
            this.forma = {};
            this.state.go('dashboard.main');
        })
            .catch((err) => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Во время регистрации произошла ошибка!';
                        }
                    }
                });

            });
    }

    send_master_class() {
        this.forma["parent_first_name"] = this.form.first_name;
        this.forma["parent_last_name"] = this.form.last_name;
        this.forma["parent_middle_name"] = this.form.middle_name;

        this.profileService.create_forma_master_class(this.forma);
        this.form = {};
        this.forma = {};
        this.state.go('dashboard.main');
    }
}