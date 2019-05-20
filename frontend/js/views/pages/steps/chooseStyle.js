import Component from '../../../views/Component.js';

import Leads from '../../../models/Leads.js';

class chooseStyle extends Component {
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
	<div class="chooseStyle">
        <h2> Здравствуйте ${this.lead.name === 'Не представился' ? '' : this.lead.name}.</h2>
        <p>Для начала давайте определимся со стилем Вашей будущей кухни. Просто выберите то, что Вам больше по душе, а
            мы при составлении проекта обязательно учтём пожелание</p>
        <div class="chooseStyle__container">
            <div class="chooseStyle__container_item" data-style="классика" onblur="chooseItem(event)">классика</div>
            <div class="chooseStyle__container_item" data-style="модерн">модерн</div>
            <div class="chooseStyle__container_item" data-style="прованс">прованс</div>
            <div class="chooseStyle__container_item" data-style="техно">техно</div>
            <div class="chooseStyle__container_item" data-style="современный">современный</div>
            <div class="chooseStyle__container_item" data-style="авторский">авторский</div>
        </div>
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
        const chooseStyleContainer = document.getElementsByClassName('chooseStyle__container')[0],
            nextBtn = document.getElementsByClassName('nextBtn')[0],
            prevBtn = document.getElementsByClassName('prevBtn')[0];


        chooseStyleContainer.addEventListener('click', () =>this.chooseItem(event));

        nextBtn.addEventListener('click', () => this.redirectToNextStep());

        prevBtn.addEventListener('click', () => this.redirectToPrevStep());



    }

    chooseItem(event) {
        let target = event.target,
            dataStyleAttr = target.getAttribute('data-style');
        if (target.className === 'chooseStyle__container_item') {
            const chooseStyleContainer = document.getElementsByClassName('chooseStyle__container')[0],
                allItem = chooseStyleContainer.getElementsByClassName('chooseStyle__container_item');
            for (let i = 0; i < allItem.length; i++) {
                if(allItem[i].classList.contains('chooseStyle__container_item_active')){
                    allItem[i].classList.remove('chooseStyle__container_item_active');
                }
            }

            target.classList.add('chooseStyle__container_item_active' );

        }

        this.editLead(dataStyleAttr);

    }

    editLead(dataStyleAttr) {

        this.lead.kstyle = dataStyleAttr;

        this.model.editLead(this.lead);

    }

    redirectToNextStep() {

        location.hash = `#/${this.lead.id}/2`;
    }

    redirectToPrevStep() {
        location.hash = `/`;
    }
}


export default chooseStyle;