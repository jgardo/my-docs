import { HomePage } from '../../../home/home.po';
import { BitbucketWizardPage } from './bitbucket-wizard.po';

describe('new BitbucketWizard page', () => {
    let page: HomePage;
    let bitbucketWizardPage: BitbucketWizardPage;

    beforeEach(() => {
        page = new HomePage();
        bitbucketWizardPage = new BitbucketWizardPage();
    });

    it('should authorize in bitbucket', async () => {
        await page.navigateToHome();
        page.apperanceOf(page.getAddFabButton());
        page.clickable(page.getAddFabButton());
        await page.getAddFabButton().click();

        page.apperanceOf(bitbucketWizardPage.getFirstSlideAuthorizeButton());
        page.clickable(bitbucketWizardPage.getFirstSlideAuthorizeButton());
        expect(bitbucketWizardPage.getAllSlides().count()).toBe(3);
        expect(bitbucketWizardPage.getFirstSlideAuthorizeButton().getText()).toContain('ZALOGUJ SIĘ');

        await bitbucketWizardPage.getFirstSlideAuthorizeButton().click();

        const expectedWorkspace = bitbucketWizardPage.getWorkspaceWithText('jg-docs-test');
        page.apperanceOf(expectedWorkspace);
        page.clickable(expectedWorkspace);
        await expectedWorkspace.click();

        const expectedRepository = bitbucketWizardPage.getRepositoryWithText('Examples');
        page.apperanceOf(expectedRepository);
        page.clickable(expectedRepository);
        await expectedRepository.click();

        page.apperanceOf(page.getListElementWithText('jg-docs-test/Examples'));

        expect(page.getListElements().count()).toBe(1);
    });
});
