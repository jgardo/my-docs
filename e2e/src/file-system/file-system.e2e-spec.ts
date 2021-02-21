import { FileSystemPage } from './file-system.po';
import { $, $$ } from 'protractor';

describe('new File System page', () => {
    let page: FileSystemPage;

    beforeEach(() => {
        page = new FileSystemPage();
    });

    afterEach(async () => {
        await page.finalize();
    });

    it('should read existing data at selected commit', async () => {
        await page.initialize();
        await page.apperanceOf($('ion-item'));

        const listElementWithText = await $$('ion-item').getText();
        expect(listElementWithText).toContain('lots-of-files');
        expect(listElementWithText).toContain('markdown');
        expect(listElementWithText.indexOf('nowy folder')).toEqual(-1);
        expect(listElementWithText.indexOf('..')).toEqual(-1);
    });

    it('should navigate through file system', async () => {
        await page.initialize();

        const markdownItem = page.getListElementWithText('markdown');
        await page.apperanceOf(markdownItem);
        await markdownItem.click();

        const templateItem = page.getListElementWithText('_szablon.md');
        await page.apperanceOf(templateItem);

        const parentItem = page.getListElementWithText('..');
        await parentItem.click();
        await page.apperanceOf(markdownItem);
    });

    it('should load next values after scrolling', async () => {
        await page.initialize();

        const lotsOfFilesItem = page.getListElementWithText('lots-of-files');
        await page.apperanceOf(lotsOfFilesItem);
        await lotsOfFilesItem.click();

        const parentItem = page.getListElementWithText('..');
        await page.apperanceOf(parentItem);
        const listElementCount = await $$('ion-item').count();
        expect(listElementCount).toBe(101);

        const file = page.getListElementWithText('File180.txt');
        const fileElem = await file.getWebElement();
        await page.scrollTo(fileElem);
        await page.clickable(file);

        const nextPageFile = page.getListElementWithText('File250.txt');

        await page.apperanceOf(nextPageFile);

        const listElementCountAfterLoadingNextPage = await $$('ion-item').count();
        expect(listElementCountAfterLoadingNextPage).toBe(201);
    });

    it('should refresh ', async () => {
        await page.initialize();

        const lotsOfFilesItem = page.getListElementWithText('lots-of-files');
        await page.apperanceOf(lotsOfFilesItem);
        await page.refresh(lotsOfFilesItem);

        const nextPageFile = page.getListElementWithText('nowy folder');
        await page.apperanceOf(nextPageFile);

        const listElementWithText = await $$('ion-item').getText();
        expect(listElementWithText).toContain('lots-of-files');
        expect(listElementWithText).toContain('markdown');
        expect(listElementWithText).toContain('nowy folder');
    });
});
