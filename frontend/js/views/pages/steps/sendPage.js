import Component from '../../../views/Component.js';

import Leads from '../../../models/Leads.js';

class sendPage extends Component {
    constructor() {
        super();


        this.model = new Leads();

    }
    render() {
        return new Promise(resolve => {
            let html;

            this.model.getLead(this.request.id).then(lead => {
                this.lead = lead;

                if (this.lead) {
                    html = `

					<div class="sendPage" >
					<h2>${this.lead.name === 'Не представился' ? ' ' : (this.lead.name + ', ')} давайте проверим, всё ли верно?</h2>
					<p> В таблице ниже - информация, на основании которой наш дизайнер составит проект Вашей кухни. Проверьте, пожалуйста</p>
					<table>
                        <tbody>
                            <tr>
                                <td>Стиль кухни</td>
                                <td>${lead.kstyle}</td>
                            </tr>
                            <tr>
                                <td>Материал кухни</td>
                                <td>${lead.material}</td>
                            </tr>
                            <tr>
                                <td>Конфигурация кухни</td>
                                <td>${lead.kconfig}</td>
                            </tr>
                            <tr>
                                <td>Размер кухни</td>
                                <td>${lead.ksize}</td>
                            </tr>
                            <tr>
                                <td>Номер телефона</td>
                                <td>${lead.phone}</td>
                            </tr>
                            <tr>
                                <td>Электронная почта</td>
                                <td>${lead.mail}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                     <div class="navBtn__container">
                             <a class="button editBtn"  title="править">Редактировать</a>
                             <a class="button sendBtn"  title="отправить">Всё верно</a>
                       </div>
				`;
                } else {
                    html = new Error404().render();
                }

                resolve(html);
            });
        });
    }
    afterRender() {
        this.setActions();
    }

    setActions() {
        const editBtn = document.getElementsByClassName('editBtn')[0],
            sendBtn = document.getElementsByClassName('sendBtn')[0];

        sendBtn.addEventListener('click', () => this.redirectToThankYouPage());

        editBtn.addEventListener('click', () => this.redirectToFirstStep());
    }


    redirectToThankYouPage() {

        this.model.sendMsg(this.lead);
        location.hash = `#/${this.lead.id}/6`;

    }


    redirectToFirstStep() {
        location.hash = `#/${this.lead.id}/1`;
    }
}


export default  sendPage;