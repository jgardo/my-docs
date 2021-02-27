import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitbucketOauthComponent } from './bitbucket/bitbucket-oauth/bitbucket-oauth.component';
import { BitbucketRedirectComponent } from './bitbucket/bitbucket-redirect/bitbucket-redirect.component';

const routes: Routes = [
    {
        path: 'bitbucket/oauth',
        component: BitbucketOauthComponent,
    },
    {
        path: 'bitbucket/redirect',
        component: BitbucketRedirectComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProviderRoutingModule {
}
