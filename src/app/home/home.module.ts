import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UtilModule } from '../util/util.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomePageRoutingModule,
        UtilModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
