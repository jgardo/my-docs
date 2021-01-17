import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FileSystemFacade } from './file-system-facade';
import { FileSystemEntry } from './model/file-system-entry';
import { FileSystemFacadeResolverService } from './file-system-facade-resolver.service';
import { concatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FileSystemPathResolverService implements Resolve<FileSystemEntry> {
    constructor(
        private fileSystemFacadeResolverService: FileSystemFacadeResolverService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const url = route.url
            .map(a => a.path)
            .join('/');
        const suffixLessUrl = url.endsWith('-details')
            ? url.substr(0, url.length - '-details'.length)
            : url;

        const paramMap = {};
        // tslint:disable-next-line:forin

        return this.fileSystemFacadeResolverService.resolve(route, state)
            .pipe(
                concatMap(fsf => this.resolveForUrlAndParamMap(fsf, suffixLessUrl, paramMap))
            );
    }

    resolveForUrlAndParamMap(fileSystemFacade: FileSystemFacade, url: string, paramMap): Observable<any> {
        return fileSystemFacade.resolvePath(url);
    }
}
