import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSystemPage } from './file-system.page';

import { FileSystemPageRoutingModule } from './file-system-routing.module';
import { UtilModule } from '../util/util.module';
import { DefaultFileSystemViewerComponent } from './viewer/default-file-system-viewer/default-file-system-viewer.component';
import { FileSystemViewerProviderService } from './viewer/file-system-viewer-provider.service';
import { ExampleCustomFileSystemViewerComponent } from './viewer/example-custom-file-system-viewer/example-custom-file-system-viewer.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        FileSystemPageRoutingModule,
        UtilModule
    ],
    providers: [FileSystemViewerProviderService],
    entryComponents: [DefaultFileSystemViewerComponent, ExampleCustomFileSystemViewerComponent],
    declarations: [FileSystemPage, DefaultFileSystemViewerComponent, ExampleCustomFileSystemViewerComponent]
})
export class FileSystemPageModule {
}
