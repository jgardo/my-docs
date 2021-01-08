import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BitbucketWizardComponent } from './bitbucket/bitbucket-wizard/bitbucket-wizard.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ProviderRoutingModule
    ],
    declarations: [BitbucketWizardComponent],
    exports: []
})
export class ProviderModule {
}
