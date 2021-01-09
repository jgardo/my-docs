import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilePage } from './file.page';

import { FilePageRoutingModule } from './file-routing.module';
import { DefaultFileViewerComponent } from './viewer/default-file-viewer/default-file-viewer.component';
import { FileViewerProviderService } from './viewer/file-viewer-provider.service';
import { MarkdownFileViewerComponent } from './viewer/markdown-file-viewer/markdown-file-viewer.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor/dist';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        FilePageRoutingModule,
        LMarkdownEditorModule
    ],
    providers: [FileViewerProviderService],
    declarations: [FilePage, DefaultFileViewerComponent, MarkdownFileViewerComponent],
    entryComponents: [DefaultFileViewerComponent, MarkdownFileViewerComponent]
})
export class FilePageModule {
}
