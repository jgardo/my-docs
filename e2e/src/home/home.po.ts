import { $ } from 'protractor';
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

    removeElement() {
        return $('ion-content ion-list').$$('ion-item-option').first();
    }
}
