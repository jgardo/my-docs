import { $, browser } from 'protractor';

export class FilePage {
    navigateToHome() {
        return browser.get('/tabs/home');
    }

    navigateToDirectory() {
        return browser.get('/tabs/home/file-system/bb-jg-docs-test-Examples');
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
}
