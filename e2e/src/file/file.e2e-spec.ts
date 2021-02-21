import { FilePage } from './file.po';

describe('new File page', () => {
    let page: FilePage;

    beforeEach(() => {
        page = new FilePage();
    });

    afterEach(async () => {
        await page.finalize();
    });

    it('should read .md file', async () => {
        await page.initialize();

        await page.navigateToMdFile();

        await page.apperanceOf(page.getMdEditor());
        const ingredients = page.getMdEditor().$('#sk-adniki');
        await page.apperanceOf(ingredients);

        const ingredientsText = await ingredients.getText();
        const ingredientsTag = await ingredients.getTagName();
        const liCount = await page.getMdEditor().$$('ul li').count();

        expect(ingredientsText).toContain('Składniki');
        expect(ingredientsTag).toContain('h2');

        expect(liCount).toEqual(2);
    });

    it('should read .txt file', async () => {
        await page.initialize();

        await page.navigateToTxtFile();

        const preContent = page.getPreContent();
        await page.apperanceOf(preContent);
        const preContentText = await preContent.getText();
        const preContentTag = await preContent.getTagName();

        expect(preContentText).toContain('Hello in 0 file');
        expect(preContentTag).toContain('pre');
    });

    it('should refresh .txt file', async () => {
        await page.initialize();

        await page.navigateToRefreshableFile();

        const preContent = page.getPreContent();
        await page.apperanceOf(preContent);
        const textBeforeRefresh = await preContent.getText();
        expect(textBeforeRefresh).toContain('Hello in 0 file');

        await page.refresh(preContent);

        const fileChange = page.getPreContentWithText('Zmiana pliku');

        await page.apperanceOf(fileChange);

        const textAfterRefresh = await preContent.getText();
        expect(textAfterRefresh).toContain('Hello in 0 file');
        expect(textAfterRefresh).toContain('Zmiana pliku');
    });
});
