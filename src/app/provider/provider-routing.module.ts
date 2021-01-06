import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitbucketOauthComponent } from './bitbucket/bitbucket-oauth/bitbucket-oauth.component';

const routes: Routes = [
  {
    path: 'bitbucket/oauth',
    component: BitbucketOauthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule {}
