import { browser, by, element } from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get('/tabs/home');
    }

    getListElements() {
        return element(by.css('ion-content ion-list')).all(by.css('ion-item'));
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


    getAddFabButton() {
        return element(by.css('ion-fab-button'));
    }
}
