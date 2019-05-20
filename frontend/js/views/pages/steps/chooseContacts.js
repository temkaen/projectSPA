import Component from '../../../views/Component.js';

import Leads from '../../../models/Leads.js';

class chooseContacts extends Component {
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

					<div class="insertSize" >
					<p>Для того, чтобы задать уточняющие вопросы и выслать Вам${this.lead.name === 'Не представился' ? ' ' : (', ' + this.lead.name + ',')} проект Вашей кухни
					оставьте пожалуйста Ваши контактные данные:</p>
					<form>
					<label for"phone"> Введите номер телефона</label>
					<input id="phone" type="tel" maxlength="15" placeholder="+375" >
					<label for"mail"> Введите адрес электронной почты</label>
					<input id="mail" type="email" placeholder=" например mail@gmail.com">
					
					
					
					
</form>
					
</div>
 <div class="navBtn__container">
         <a class="button prevBtn"  title="назад">Назад</a>
         <a class="button nextBtn"  title="продолжить">Далее</a>
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
        const phone = document.getElementById('phone'),
            nextBtn = document.getElementsByClassName('nextBtn')[0],
            prevBtn = document.getElementsByClassName('prevBtn')[0],
            mail = document.getElementById('mail');

        phone.addEventListener('change', function validatePhone(){

            if(/^(8(-?)0|(\+)?375)-?[29|25|44|33]{2}-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/i.test(`${phone.value}`)) {
                return true;
            }else {
                phone.value = '';
                phone.setAttribute('placeholder', 'введите корректный номер телефона');
            }
        });

        mail.addEventListener('change', function validatePhone(){

            if(/@/i.test(`${mail.value}`)) {
                return true;
            }else {
                mail.value = '';
                mail.setAttribute('placeholder', 'введите корректный адрес');
            }
        });


        nextBtn.addEventListener('click', () => {

            if(!mail.value && !phone.value) {
                return false;
            }

            this.editLead(mail, phone)
        });
        prevBtn.addEventListener('click', () => this.redirectToPrevStep());


    }

    editLead(mail, phone) {


        this.lead.mail = mail.value;

        this.lead.phone = phone.value;

        this.model.editLead(this.lead).then(() => this.redirectToNextStep());

    }

    redirectToNextStep() {

        location.hash = `#/${this.lead.id}/5`;

    }


    redirectToPrevStep() {
        location.hash = `#/${this.lead.id}/3`;
    }
}


export default chooseContacts;