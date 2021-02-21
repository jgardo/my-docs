import { $, browser, by, element } from 'protractor';
import { BasePageObject } from '../util/base.po';
import { MockService } from '../util/mock.service';

export class FilePage extends BasePageObject {

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

    navigateToTxtFile() {
        return browser.get('/tabs/home/file-system/bb-jg-docs-test-Examples/lots-of-files/File0.txt-details');
    }

    navigateToRefreshableFile() {
        return this.navigateToTxtFile();
    }

    navigateToMdFile() {
        return browser.get('/tabs/home/file-system/bb-jg-docs-test-Examples/markdown/_szablon.md-details');
    }

    getMdEditor() {
        return $('ion-content md-editor');
    }

    getPreContent() {
        return $('ion-content pre');
    }

    getPreContentWithText(text: string) {
        return element(by.cssContainingText('pre', text));
    }
}
