import { $, by, element } from 'protractor';
import { BasePageObject } from '../util/base.po';
import { MockService } from '../util/mock.service';

export class HomePage extends BasePageObject {
    constructor() {
        super(new MockService());
    }

    initialize() {
        return this.initializeHome();
    }

    finalize() {
        return this.finalizeMock();
    }

    getListElements() {
        return $('ion-content ion-list').$$('ion-item');
    }

    getOnlyListElement() {
        return this.getListElements().first();
    }

    getListElementWithText(text: string) {
        return element(by.cssContainingText('ion-content ion-list ion-item', text));
    }

    removeElement() {
        return $('ion-content ion-list').$$('ion-item-option').first();
    }
}
