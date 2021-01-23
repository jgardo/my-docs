import { Injectable } from '@angular/core';
import { DataSourceFacade } from '../facade/data-source-facade';
import { Observable } from 'rxjs';
import { DataSource } from '../facade/model/data-source';
import { BitbucketService } from './bitbucket.service';
import { map } from 'rxjs/operators';
import { FileSystemFacadeCacheService } from '../facade/file-system-facade-cache.service';

@Injectable({
    providedIn: 'root'
})
export class BitbucketDataSourceFacadeService implements DataSourceFacade {

    constructor(private bitbucketServide: BitbucketService,
                private fileSystemFacadeCacheService: FileSystemFacadeCacheService
    ) {
    }

    list(): Observable<Array<DataSource>> {
        return this.bitbucketServide.list()
            .pipe(map(configs => {
                return configs.map(config => new DataSource(
                    `bb-${config.workspace.name}-${config.repository.name}`,
                    `${config.workspace.name}/${config.repository.name}`,
                    'BITBUCKET',
                    config
                ));
            }));
    }

    create(): Observable<DataSource> {
        return this.bitbucketServide.integrateNewRepository()
            .pipe(map(client => {
                const config = client.config;
                return new DataSource(
                    `bb-${config.workspace.name}-${config.repository.name}`,
                    `${config.workspace.name}/${config.repository.name}`,
                    'BITBUCKET',
                    config
                );
            }));
    }

    delete(dataSource: DataSource): Observable<void> {
        return this.bitbucketServide.delete(dataSource.config.repository.uuid);
    }

}
