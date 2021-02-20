import { FileSystemPage } from './file-system.po';
import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('new File page', () => {
    let page: FileSystemPage;

    beforeEach(() => {
        page = new FileSystemPage();
    });

    afterEach(async () => {
        await page.finalize();
    });

    it('should read existing data at selected commit', async () => {
        await page.initialize();
        await browser.wait(ExpectedConditions.presenceOf($('ion-item')), 5000, 'Fetch list');

        const listElementWithText = await $$('ion-item').getText();
        expect(listElementWithText).toContain('lots-of-files');
        expect(listElementWithText).toContain('markdown');
        expect(listElementWithText.indexOf('nowy folder')).toEqual(-1);
        expect(listElementWithText.indexOf('..')).toEqual(-1);
    });

    it('should navigate through file system', async () => {
        await page.initialize();

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
        await page.initialize();

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
        await page.initialize();

        const lotsOfFilesItem = page.getListElementWithText('lots-of-files');
        await browser.wait(ExpectedConditions.presenceOf(lotsOfFilesItem), 5000, 'Fetch list');
        await page.refresh(lotsOfFilesItem);

        const nextPageFile = page.getListElementWithText('nowy folder');
        await browser.wait(ExpectedConditions.presenceOf(nextPageFile), 5000, 'Fetch list');

        const listElementWithText = await $$('ion-item').getText();
        expect(listElementWithText).toContain('lots-of-files');
        expect(listElementWithText).toContain('markdown');
        expect(listElementWithText).toContain('nowy folder');
    });
});
