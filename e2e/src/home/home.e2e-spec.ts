import { HomePage } from './home.po';

describe('new Home page', () => {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    afterEach(async () => {
        await page.finalize();
    });

    it('should read existing data', async () => {
        await page.initialize();

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('jg-docs-test/Examples');
    });

    it('should have no repositories', async () => {
        await page.navigateToHome();

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('Brak repozytoriów');
    });

    it('should remove existing data', async () => {
        await page.initialize();

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('jg-docs-test/Examples');

        const item1 = page.getOnlyListElement();
        await page.swipeElement(item1);

        const removeElement = await page.removeElement();
        expect(removeElement.getText()).toContain('USUŃ');

        await removeElement.click();

        await page.apperanceOf(page.getListElementWithText('Brak repozytoriów'));
        expect(page.getListElements().count()).toBe(1);
    });
});
