import { $, by } from 'protractor';
import { BasePageObject } from '../../../util/base.po';
import { MockService } from '../../../util/mock.service';

export class BitbucketWizardPage extends BasePageObject {

    constructor() {
        super(new MockService());
    }
    initialize() {
        throw new Error('Method not implemented.');
    }

    finalize() {
    }

    getSlides() {
        return $('ion-slides');
    }

    getAllSlides() {
        return this.getSlides().$$('ion-slide');
    }

    getFirstSlide() {
        return this.getAllSlides().first();
    }

    getFirstSlideAuthorizeButton() {
        return this.getFirstSlide().$('ion-button');
    }

    getSecondSlide() {
        return this.getAllSlides().get(1);
    }

    getWorkspaces() {
        return this.getSecondSlide().$('ion-content ion-list');
    }

    getWorkspaceWithText(text: string) {
        return this.getWorkspaces().element(by.cssContainingText('ion-item', text));
    }

    getThirdSlide() {
        return this.getAllSlides().get(2);
    }

    getRepositories() {
        return this.getThirdSlide().$('ion-content ion-list');
    }

    getRepositoryWithText(text: string) {
        return this.getRepositories().element(by.cssContainingText('ion-item', text));
    }
}
