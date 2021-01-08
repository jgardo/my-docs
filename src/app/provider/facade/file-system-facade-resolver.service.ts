import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FileSystemFacadeCacheService } from './file-system-facade-cache.service';
import { FileSystemFacade } from './file-system-facade';

@Injectable({
    providedIn: 'root',
})
export class FileSystemFacadeResolverService implements Resolve<FileSystemFacade> {
    constructor(
        private fileSystemFacadeCacheService: FileSystemFacadeCacheService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FileSystemFacade> {
        const url = state.url;
        const paramMap = {};

        for (const key of route.paramMap.keys) {
            paramMap[key] = route.paramMap.get(key);
        }

        return this.resolveForUrlAndParamMap(url, paramMap);
    }

    resolveForUrlAndParamMap(url, paramMap): Observable<FileSystemFacade> {
        return this.fileSystemFacadeCacheService.get(paramMap.fileSystemId);
    }
}
