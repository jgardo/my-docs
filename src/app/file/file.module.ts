import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilePage } from './file.page';

import { FilePageRoutingModule } from './file-routing.module';
import { DefaultFileViewerComponent } from './viewer/default-file-viewer/default-file-viewer.component';
import { FileViewerProviderService } from './viewer/file-viewer-provider.service';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        FilePageRoutingModule
    ],
    providers: [FileViewerProviderService],
    declarations: [FilePage, DefaultFileViewerComponent],
    entryComponents: [DefaultFileViewerComponent]
})
export class FilePageModule {
}
