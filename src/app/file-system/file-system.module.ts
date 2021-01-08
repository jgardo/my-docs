import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSystemPage } from './file-system.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FileSystemPageRoutingModule } from './file-system-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FileSystemPageRoutingModule
  ],
  declarations: [FileSystemPage]
})
export class FileSystemPageModule {}
