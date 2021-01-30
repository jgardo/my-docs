import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSystemPage } from './file-system.page';

import { FileSystemPageRoutingModule } from './file-system-routing.module';
import { UtilModule } from '../util/util.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        FileSystemPageRoutingModule,
        UtilModule
    ],
    declarations: [FileSystemPage]
})
export class FileSystemPageModule {
}
