import { FilePage } from './file.po';
import { MockService } from '../util/mock.service';
import { browser, by, element, ExpectedConditions } from 'protractor';

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
        await page.navigateToDirectory();
        await browser.waitForAngularEnabled(false);
    }

    it('should read .md file', async () => {
        await initializeFileSystem();

        await page.navigateToMdFile();

        await browser.wait(ExpectedConditions.presenceOf(page.getMdEditor()), 5000, 'Fetch editor');
        const ingredients = page.getMdEditor().$('#sk-adniki');
        await browser.wait(ExpectedConditions.presenceOf(ingredients), 5000, 'Fetch editor');

        const ingredientsText = await ingredients.getText();
        const ingredientsTag = await ingredients.getTagName();
        const liCount = await page.getMdEditor().$$('ul li').count();

        expect(ingredientsText).toContain('Składniki');
        expect(ingredientsTag).toContain('h2');

        expect(liCount).toEqual(2);
    });

    it('should read .txt file', async () => {
        await initializeFileSystem();

        await page.navigateToTxtFile();

        const preContent = page.getPreContent();
        await browser.wait(ExpectedConditions.presenceOf(preContent), 5000, 'Fetch previewer');
        const preContentText = await preContent.getText();
        const preContentTag = await preContent.getTagName();

        expect(preContentText).toContain('Hello in 0 file');
        expect(preContentTag).toContain('pre');
    });

    it('should refresh .txt file', async () => {
        await initializeFileSystem();

        await page.navigateToRefreshableFile();

        const preContent = page.getPreContent();
        await browser.wait(ExpectedConditions.presenceOf(preContent), 5000, 'Fetch previewer');
        const textBeforeRefresh = await preContent.getText();
        expect(textBeforeRefresh).toContain('Hello in 0 file');

        await browser.actions()
            .mouseDown(preContent)
            .mouseMove({x: 0, y: 100})
            .mouseMove({x: 0, y: 100})
            .mouseMove({x: 0, y: 100})
            .mouseUp()
            .perform();

        const fileChange = element(by.cssContainingText('pre', 'Zmiana pliku'));

        await browser.wait(ExpectedConditions.presenceOf(fileChange), 5000, 'Refresh');

        const textAfterRefresh = await preContent.getText();
        expect(textAfterRefresh).toContain('Hello in 0 file');
        expect(textAfterRefresh).toContain('Zmiana pliku');
    });
});
