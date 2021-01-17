import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileSystemPage } from './file-system.page';
import { FileSystemFacadeResolverService } from '../provider/facade/file-system-facade-resolver.service';
import { FileSystemPathResolverService } from '../provider/facade/file-system-path-resolver.service';
import { filePathMatch } from '../file/file-path-matcher';

const routes: Routes = [
    {
        path: ':fileSystemId',
        children: [{
            matcher: filePathMatch,
            loadChildren: () => import('../file/file.module').then(m => m.FilePageModule)
        }, {
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
export class FileSystemPageRoutingModule {
}
