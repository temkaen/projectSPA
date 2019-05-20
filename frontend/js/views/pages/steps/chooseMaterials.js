import Component from '../../../views/Component.js';

import Leads from '../../../models/Leads.js';

class chooseMaterials extends Component {
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
	<div class="chooseMaterials">
        <h2>Выберите тип фасадов</h2>
        <p>Выберите фасад, который Вам больше нравится, и наши дизайнеры предложат проект именно с фасадами выбранной коллекции</p>
        <div class="chooseMaterials__container">
            <div class="chooseMaterials__container_item" data-material="ЛДСП">ЛДСП</div>
            <div class="chooseMaterials__container_item" data-material="Пластик">пластик</div>
            <div class="chooseMaterials__container_item" data-material="Акрил">акрил</div>
            <div class="chooseMaterials__container_item" data-material="Рамочный МДФ">рамочный мдф</div>
            <div class="chooseMaterials__container_item" data-material="Крашеный МДФ">крашеный мдф</div>
            <div class="chooseMaterials__container_item" data-material="Массив">массив</div>
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
        const chooseStyleContainer = document.getElementsByClassName('chooseMaterials__container')[0],
            nextBtn = document.getElementsByClassName('nextBtn')[0],
            prevBtn = document.getElementsByClassName('prevBtn')[0];



        nextBtn.addEventListener('click', () => this.redirectToNextStep());
        prevBtn.addEventListener('click', () => this.redirectToPrevStep());
        chooseStyleContainer.addEventListener('click', () =>this.chooseItem(event));

    }

    chooseItem(event) {
        let target = event.target,
            dataMaterialAttr = target.getAttribute('data-material');
        if (target.className === 'chooseMaterials__container_item') {
            const chooseStyleContainer = document.getElementsByClassName('chooseMaterials__container')[0],
                allItem = chooseStyleContainer.getElementsByClassName('chooseMaterials__container_item');
            for (let i = 0; i < allItem.length; i++) {
                if(allItem[i].classList.contains('chooseStyle__container_item_active')){
                    allItem[i].classList.remove('chooseStyle__container_item_active');
                }
            }
            target.classList.add('chooseStyle__container_item_active' );

        }
        this.editLead(dataMaterialAttr);
    }

    editLead(dataMaterialAttr) {

        this.lead.material = (dataMaterialAttr);

        this.model.editLead(this.lead);

    }

    redirectToNextStep() {
        location.hash = `#/${this.lead.id}/3`;

    }

    redirectToPrevStep() {
        location.hash = `#/${this.lead.id}/1`;
    }
}


export default chooseMaterials;