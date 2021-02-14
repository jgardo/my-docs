import { $, browser, by, element, ExpectedConditions } from 'protractor';

export class FilePage {
    navigateToHome() {
        return browser.get('/tabs/home');
    }

    navigateToFile() {
        return browser.get('/tabs/home/file-system/bb-jg-docs-test-Examples');
    }

    getList() {
        return $('ion-content ion-list');
    }

    getListElements() {
        return element(by.css('ion-content ion-list')).$$('ion-item');
    }

    getListElementWithText(text: string) {
        return element(by.cssContainingText('ion-item', text));
    }

    getOnlyListElement() {
        return element(by.css('ion-content ion-list')).all(by.css('ion-item')).first();
    }

    removeElement() {
        return element(by.css('ion-content ion-list')).all(by.css('ion-item-option')).first();
    }

    swipeItem(item1) {
        return browser.driver.actions()
            .mouseDown(item1)
            .mouseMove({x: 50, y: 0})
            .mouseMove({x: 50, y: 0})
            .mouseMove({x: 50, y: 0})
            .mouseUp()
            .perform();
    }

    scrollItem(item1) {
        browser.executeScript('arguments[0].scrollIntoView(true)', item1);
        browser.wait(ExpectedConditions.elementToBeClickable(item1), 5000);
    }


    getAddFabButton() {
        return element(by.css('ion-fab-button'));
    }
}
