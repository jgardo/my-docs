import { HomePage } from '../../../home/home.po';
import { BitbucketWizardPage } from './bitbucket-wizard.po';
import { browser, ExpectedConditions } from 'protractor';

describe('new BitbucketWizard page', () => {
    let page: HomePage;
    let bitbucketWizardPage: BitbucketWizardPage;

    beforeEach(() => {
        page = new HomePage();
        bitbucketWizardPage = new BitbucketWizardPage();
    });

    it('should authorize in bitbucket', async () => {
        await page.navigateTo();
        await page.getAddFabButton().click();
        browser.sleep(300);

        browser.wait(ExpectedConditions.presenceOf(bitbucketWizardPage.getSlides()), 5000, 'Slides taking too long ');

        expect(bitbucketWizardPage.getAllSlides().count()).toBe(3);
        expect(bitbucketWizardPage.getFirstSlideAuthorizeButton().getText()).toContain('ZALOGUJ SIĘ');

        await bitbucketWizardPage.getFirstSlideAuthorizeButton().click();

        browser.wait(ExpectedConditions.presenceOf(bitbucketWizardPage.getWorkspaces()), 5000, 'Slides taking too long ');

        const workspaces = bitbucketWizardPage.getWorkspaces();

        expect(workspaces.getText()).toContain('jg-docs-test');

        await workspaces.click();

        browser.wait(ExpectedConditions.presenceOf(bitbucketWizardPage.getRepositories()), 5000, 'Slides taking too long ');
        const repositories = bitbucketWizardPage.getRepositories();

        expect(repositories.getText()).toContain('Examples');
        await repositories.click();

        browser.sleep(3000);

        expect(page.getListElements().count()).toBe(1);
        expect(page.getOnlyListElement().getText()).toContain('jg-docs-test/Examples');
    });
});
