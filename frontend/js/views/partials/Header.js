import Component from '../../views/Component.js';

class Header extends Component {
    render() {

        return new Promise(resolve => {
            resolve(`

    <div class="title">
        <img src="/img/logo.png">
    </div>
            `);
        });
    }
}

export default Header;