import { by, element } from 'protractor';

export class BitbucketWizardPage {

    getSlides() {
        return element(by.css('ion-slides'));
    }

    getAllSlides() {
        return this.getSlides().all(by.css('ion-slide'));
    }

    getFirstSlide() {
        return this.getAllSlides().first();
    }

    getFirstSlideAuthorizeButton() {
        return this.getAllSlides().first().element(by.css('ion-button'));
    }

    getSecondSlide() {
        return this.getAllSlides().get(1);
    }

    getWorkspaces() {
        return this.getAllSlides().get(1).element(by.css('ion-content ion-list')).element(by.css('ion-item'));
    }

    getRepositories() {
        return this.getAllSlides().get(2).element(by.css('ion-content ion-list')).element(by.css('ion-item'));
    }
}
