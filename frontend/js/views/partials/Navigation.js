import Component from '../../views/Component.js';
import Leads from "../../models/Leads.js";

class Navigation extends Component {


    constructor() {
        super();

        this.model = new Leads();
    }



    render() {

        return new Promise(resolve => {

                resolve(`

    <div class="navBtn__container">
        <a class="button startBtn" href="${location}/1" title="Нажмите чтобы начать">Начать</a>
    </div>

            `

                );
            }




            );
        }

        // afterRender(){
        //     this.setId();
        // }
        //
        // setId() {
        //     const startBtn = document.getElementsByClassName('startBtn')[0];
        //     startBtn.addEventListener('click', function () {
        //         const newLead = {};
        //         this.model.addLead(newLead);
        //     }
        // );
        //
        // }

}

export default Navigation;