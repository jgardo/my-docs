import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FileSystemFacade } from './file-system-facade';
import { FileSystemFacadeResolverService } from './file-system-facade-resolver.service';
import { concatMap } from 'rxjs/operators';
import { File } from './model/file';

@Injectable({
    providedIn: 'root',
})
export class FileResolverService implements Resolve<File> {
    constructor(
        private fileSystemFacadeResolverService: FileSystemFacadeResolverService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<File> {
        const url = route.url
            .map(a => a.path)
            .join('/');
        const paramMap = {};
        // tslint:disable-next-line:forin

        return this.fileSystemFacadeResolverService.resolve(route, state)
            .pipe(
                concatMap(fsf => this.resolveForUrlAndParamMap(fsf, url, paramMap))
            );
    }

    resolveForUrlAndParamMap(fileSystemFacade: FileSystemFacade, url: string, paramMap): Observable<File> {
        return fileSystemFacade.resolveFile(url);
    }
}
