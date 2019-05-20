import Component from '../../../views/Component.js';

import Leads from '../../../models/Leads.js';

class StartPage extends Component {
    constructor() {
        super();

        this.model = new Leads();

    }
    render() {
        return new Promise(resolve => {
            let html;

            this.model.addLead().then(lead => {
                this.lead = lead;


                if (this.lead) {

                        html = `
<div class="startPage">
    <p>Доброго дня. Вы попали на эту страничку потому, что в поисках современной, функциональной и красивой мебели для кухни...</p>
        <input type="text" id="leadName" placeholder="Представьтесь пожалуйста">
                    
        <div class="navBtn__container">
            <a class="button startBtn"  title="Нажмите чтобы начать">Начать</a>
        </div>
        
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

        const leadName = document.getElementById('leadName'),
              startBtn = document.getElementsByClassName('startBtn')[0];

        startBtn.addEventListener('click', () => this.editLead(leadName));

    }

    editLead(leadName) {

        let name = leadName.value.trim();

        if (!name) {
            this.lead.name = '';
        } else {
            this.lead.name = name[0].toUpperCase() + name.slice(1);
        }


        this.model.editLead(this.lead).then(() => this.redirectToNextStep());

    }

    redirectToNextStep() {
        location.hash = `#/${this.lead.id}/1`;
    }
}

export default StartPage;