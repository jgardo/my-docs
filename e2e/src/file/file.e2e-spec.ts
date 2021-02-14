import { FilePage } from './file.po';
import { MockService } from '../util/mock.service';
import { $$, browser, ExpectedConditions } from 'protractor';

describe('new File page', () => {
    let page: FilePage;
    let mock: MockService;

    beforeEach(() => {
        page = new FilePage();
        mock = new MockService();
    });

    afterEach(async () => {
        await mock.clearStorage();
    });

    async function initializeFileSystem() {
        await page.navigateToHome();
        await mock.initializeProviders();
        await mock.initializeAccessToken();
        await browser.waitForAngularEnabled(true);
        await page.navigateToFile();
        await browser.waitForAngularEnabled(false);

        await browser.wait(ExpectedConditions.presenceOf(page.getList()), 5000, 'Fetch list ');
    }

    it('should read existing data at selected commit', async () => {
        await initializeFileSystem();

        const listElementWithText = await $$('ion-item').getText();
        expect(listElementWithText).toContain('lots-of-files');
        expect(listElementWithText).toContain('markdown');
        expect(listElementWithText.indexOf('nowy folder')).toEqual(-1);
        expect(listElementWithText.indexOf('..')).toEqual(-1);
    });

    it('should navigate through file system', async () => {
        await initializeFileSystem();

        const markdownItem = page.getListElementWithText('markdown');
        await browser.wait(ExpectedConditions.presenceOf(markdownItem), 5000, 'Fetch list');
        await markdownItem.click();

        const templateItem = page.getListElementWithText('_szablon.md');
        await browser.wait(ExpectedConditions.presenceOf(templateItem), 5000, '_szablon.md do not exists');

        const parentItem = page.getListElementWithText('..');
        await parentItem.click();
        await browser.wait(ExpectedConditions.presenceOf(markdownItem), 5000, 'Fetch list same list');
    });

    it('should load next values after scrolling', async () => {
        await initializeFileSystem();

        const lotsOfFilesItem = page.getListElementWithText('lots-of-files');
        await browser.wait(ExpectedConditions.presenceOf(lotsOfFilesItem), 5000, 'Fetch list');
        await lotsOfFilesItem.click();

        const parentItem = page.getListElementWithText('..');
        await browser.wait(ExpectedConditions.presenceOf(parentItem), 5000, 'Find parent element');
        const listElementCount = await $$('ion-item').count();
        expect(listElementCount).toBe(101);

        const file = page.getListElementWithText('File180.txt');
        const fileElem = await file.getWebElement();
        await browser.executeScript('arguments[0].scrollIntoView(true)', fileElem);
        await browser.wait(ExpectedConditions.elementToBeClickable(file), 5000);

        const nextPageFile = page.getListElementWithText('File250.txt');

        await browser.wait(ExpectedConditions.presenceOf(nextPageFile), 5000, 'Fetch list');

        const listElementCountAfterLoadingNextPage = await $$('ion-item').count();
        expect(listElementCountAfterLoadingNextPage).toBe(201);
    });

    it('should refresh ', async () => {
        await initializeFileSystem();

        const lotsOfFilesItem = page.getListElementWithText('lots-of-files');
        await browser.actions()
            .mouseDown(lotsOfFilesItem)
            .mouseMove({x: 0, y: 100})
            .mouseMove({x: 0, y: 100})
            .mouseMove({x: 0, y: 100})
            .mouseUp()
            .perform();

        const nextPageFile = page.getListElementWithText('nowy folder');
        await browser.wait(ExpectedConditions.presenceOf(nextPageFile), 5000, 'Fetch list');

        const listElementWithText = await $$('ion-item').getText();
        expect(listElementWithText).toContain('lots-of-files');
        expect(listElementWithText).toContain('markdown');
        expect(listElementWithText).toContain('nowy folder');
    });


});
