import { $, by } from 'protractor';
import { BasePageObject } from '../util/base.po';
import { MockService } from '../util/mock.service';

export class FileSystemPage extends BasePageObject {

    constructor() {
        super(
            new MockService()
        );
    }

    async initialize() {
        return await this.initializeFileSystem();
    }

    finalize() {
        return this.finalizeMock();
    }

    getList() {
        return $('ion-content ion-list');
    }

    getListElements() {
        return this.getList().$$('ion-item');
    }

    getListElementWithText(text: string) {
        return this.getList().element(by.cssContainingText('ion-item', text));
    }

    getOnlyListElement() {
        return this.getListElements().first();
    }

    removeElement() {
        return this.getList().$$('ion-item-option').first();
    }
}
