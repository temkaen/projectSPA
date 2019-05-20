import Utils from './helpers/Utils.js';

import Header from './views/partials/Header.js';
import Footer from './views/partials/Footer.js';


import Error404 from './views/pages/steps/Error404.js';

import startPage from './views/pages/steps/StartPage.js';
import chooseStyle from './views/pages/steps/chooseStyle.js';
import chooseMaterials from './views/pages/steps/chooseMaterials.js';
import insertSize from './views/pages/steps/insertSize.js';
import chooseContacts from "./views/pages/steps/chooseContacts.js";
import sendPage from "./views/pages/steps/sendPage.js";

const Routes = {
    '/': startPage,
    '/:id/1': chooseStyle,
    '/:id/2': chooseMaterials,
    '/:id/3': insertSize,
    '/:id/4': chooseContacts,
    '/:id/5': sendPage

};




function router() {
    const headerContainer = document.getElementsByTagName('header')[0],
          mainContainer = document.getElementsByTagName('main')[0],
          footerContainer = document.getElementsByTagName('footer')[0],
          header = new Header(),
          footer = new Footer();


    header.render().then(html => {
        headerContainer.innerHTML = html;
        header.afterRender();
    });

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.id ? ':id' : ''}${request.resource ? `/${request.resource}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() :  new Error404();

    page.render().then(html => {
        mainContainer.innerHTML = html;
        page.afterRender();
    });



    footer.render().then(html => {
        footerContainer.innerHTML = html;
        footer.afterRender();
    });
}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);
