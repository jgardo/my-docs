import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileSystemPage} from './file-system.page';
import {FileSystemFacadeResolverService} from '../provider/facade/file-system-facade-resolver.service';
import {FileSystemPathResolverService} from '../provider/facade/file-system-path-resolver.service';

const routes: Routes = [
  {
    path: ':fileSystemId',
    children: [{
      path: '**',
      component: FileSystemPage,
      runGuardsAndResolvers: 'always',
      resolve: {
        fileSystemFacade: FileSystemFacadeResolverService,
        fileSystemEntry: FileSystemPathResolverService
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileSystemPageRoutingModule {}
