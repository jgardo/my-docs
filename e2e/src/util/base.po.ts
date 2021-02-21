import { $, browser, ExpectedConditions } from 'protractor';
import { MockService } from './mock.service';

export abstract class BasePageObject {

    abstract initialize();
    abstract finalize();

    protected constructor(protected mockService: MockService) {

    }

    protected async initializeFileSystem() {
        await this.navigateToHome();
        await this.mockService.initializeProviders();
        await this.mockService.initializeAccessToken();
        await browser.waitForAngularEnabled(true);
        await this.navigateToDirectory();
        await browser.waitForAngularEnabled(false);
    }

    protected async initializeHome() {
        await this.navigateToHome();
        await this.mockService.initializeProviders();
        await browser.refresh();
    }

    protected async finalizeMock() {
        return browser.executeScript('return window.clearStorage();');
    }

    navigateToHome() {
        return browser.get('/tabs/home');
    }

    navigateToDirectory() {
        return browser.get('/tabs/home/file-system/bb-jg-docs-test-Examples');
    }

    refresh(el) {
        return browser.actions()
            .mouseDown(el)
            .mouseMove({x: 0, y: 100})
            .mouseMove({x: 0, y: 100})
            .mouseMove({x: 0, y: 100})
            .mouseUp()
            .perform();
    }

    async scrollTo(el) {
        await browser.executeScript('arguments[0].scrollIntoView(true)', el);
    }

    swipeElement(el) {
        return browser.driver.actions()
            .mouseDown(el)
            .mouseMove({x: 50, y: 0})
            .mouseMove({x: 50, y: 0})
            .mouseMove({x: 50, y: 0})
            .mouseUp()
            .perform();
    }

    getAddFabButton() {
        return $('ion-fab-button');
    }

    apperanceOf(el) {
        return browser.wait(ExpectedConditions.presenceOf(el), 5000);
    }

    clickable(el) {
        return browser.wait(ExpectedConditions.elementToBeClickable(el), 5000);
    }
}
