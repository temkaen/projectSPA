import Component from '../../Component.js';

class Error404 extends Component{
    render() {
        return new Promise(resolve => {
            resolve(`
<div class="error">
 <h1 class="error-title">Ой, кажется, такой страницы здесь нет</h1>
                <p>Страница, на которую Вы попали, перемещена, удалена либо больше не существует. </p>
                <img src="/img/404.png">   
</div>                
                          
            `);
        });
    }
}

export default Error404;