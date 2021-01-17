import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePage } from './file.page';
import { FileSystemFacadeResolverService } from '../provider/facade/file-system-facade-resolver.service';
import { FileResolverService } from '../provider/facade/file-resolver.service';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: '**',
            component: FilePage,
            runGuardsAndResolvers: 'always',
            resolve: {
                fileSystemFacade: FileSystemFacadeResolverService,
                file: FileResolverService
            }
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilePageRoutingModule {
}
