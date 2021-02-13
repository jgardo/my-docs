import { HomePage } from './home.po';
import { MockService } from '../util/mock.service';
import { browser } from 'protractor';

describe('new Home page', () => {
    let page: HomePage;
    let mock: MockService;

    beforeEach(() => {
        page = new HomePage();
        mock = new MockService();
    });

    afterEach(async () => {
        await mock.clearStorage();
    });

    it('should read existing data', async () => {
        await page.navigateTo();
        await mock.initializeProviders();
        await browser.refresh();

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('jg-docs-test/Examples');
    });

    it('should have no repositories', async () => {
        await page.navigateTo();

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('Brak repozytoriów');
    });

    it('should remove existing data', async () => {
        await page.navigateTo();
        await mock.initializeProviders();
        await browser.refresh();

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('jg-docs-test/Examples');

        const item1 = page.getOnlyListElement();
        await page.swipeItem(item1);

        const removeElement = await page.removeElement();
        expect(removeElement.getText()).toContain('USUŃ');

        await removeElement.click();

        await browser.sleep(100);

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('Brak repozytoriów');
    });
});
