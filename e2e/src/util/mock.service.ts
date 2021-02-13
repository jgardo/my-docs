import { browser } from 'protractor';

export class MockService {
    navigateTo() {
        return browser.get('/tabs/home');
    }

    initializeAccessToken() {
        return browser.executeScript('return window.initializeAccessToken();');
    }

    initializeProviders() {
        return browser.executeScript('return window.initializeProviders();');
    }

    clearStorage() {
        return browser.executeScript('return window.clearStorage();');
    }
}
