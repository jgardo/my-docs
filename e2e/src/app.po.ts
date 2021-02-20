import { $, browser } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getPageTitle() {
        return $('ion-title').getText();
    }

    getUrl() {
        return browser.getCurrentUrl();
    }
}
