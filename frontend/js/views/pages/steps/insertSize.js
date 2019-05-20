import Component from '../../../views/Component.js';

import Leads from '../../../models/Leads.js';

class insertSize extends Component {

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
					<p>Для того, чтобы составить проект Вашей кухни, нам понадобятся её размеры и конфигурация. Если Вы прямо сейчас не знаете размеров - не беда. Просто введите примерные</p>
					<form>
					<label for"selectConfig"> Выберите конфигурацию кухни</label>
					<select  id="selectConfig">
                      <option>Прямая (линейная)</option>
                      <option>Угловая</option>
                      <option>П-образная</option>
                      <option>Не определились</option>
                    </select>
					
					<input type="text" id="inputSize" placeholder="Длина кухни">
					
					
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
        const inputSize = document.getElementById('inputSize'),
                nextBtn = document.getElementsByClassName('nextBtn')[0],
                prevBtn = document.getElementsByClassName('prevBtn')[0],
                selectConfig = document.getElementById('selectConfig');

        selectConfig.addEventListener('input', changePlaceholder);

        function changePlaceholder(){
            let configValue = selectConfig.value;

            if(configValue === 'Прямая (линейная)') {
                inputSize.setAttribute('placeholder', 'Длина кухни');
            }
            if(configValue === 'Угловая') {
                inputSize.setAttribute('placeholder', 'длина и ширина через пробел');
            }
            if(configValue === 'П-образная') {
                inputSize.setAttribute('placeholder', 'размеры по 3 стенам');
            }
            if(configValue === 'Не определились') {
                inputSize.setAttribute('placeholder', 'произвольные размеры');
            }

        }

        nextBtn.addEventListener('click', () => this.editLead(inputSize, selectConfig));
        prevBtn.addEventListener('click', () => this.redirectToPrevStep());
    }

    editLead(inputSize, selectConfig) {

        this.lead.ksize = inputSize.value.trim();

        this.lead.kconfig = selectConfig.value;

        this.model.editLead(this.lead).then(() => this.redirectToNextStep());

    }

    redirectToNextStep() {
        location.hash = `#/${this.lead.id}/4`;

    }


    redirectToPrevStep() {
        location.hash = `#/${this.lead.id}/2`;
    }
}

export default insertSize;