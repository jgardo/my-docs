import { FileSystemFacade } from '../facade/file-system-facade';
import { Observable } from 'rxjs';
import { FileSystemEntry } from '../facade/model/file-system-entry';
import { BitbucketClient } from './bitbucket-client';
import { map, tap } from 'rxjs/operators';
import { Schema } from 'bitbucket';
import { DataSource } from '../facade/model/data-source';
import { File } from '../facade/model/file';
import Treeentry = Schema.Treeentry;

export class BitbucketFileSystemFacadeService implements FileSystemFacade {

    constructor(
        private dataSource: DataSource,
        private bitbucketClient: BitbucketClient,
    ) {
    }

    getDataSource(): DataSource {
        return this.dataSource;
    }

    resolvePath(path: string): Observable<FileSystemEntry> {
        return this.bitbucketClient.resolvePath(path)
            .pipe(map(data => this.createFileSystemEntry(path, data)));
    }

    private createFileSystemEntry(path: string, result): FileSystemEntry {
        const { data } = result;
        if (path === '' || path.charAt(0) !== '/') {
            path = '/' + path;
        }
        const n = path.substr(path.lastIndexOf('/') + 1);

        if (data.values) {
            const fse = data.values as unknown as Array<Treeentry>;
            const entries = this.createEntries(fse);
            const nextPage = this.createNextPage(data, path);

            return new FileSystemEntry(n, path, this.dataSource, 'DIRECTORY', entries, nextPage);
        } else {
            return new FileSystemEntry(n, path, this.dataSource, 'FILE', []);
        }
    }

    private createEntries(fse: Array<Schema.Treeentry>): Array<FileSystemEntry> {
        return fse.map(e => {
            const name = e.path.substr(e.path.lastIndexOf('/') + 1);
            let type = null;
            if (e.type === 'commit_directory') {
                type = 'DIRECTORY';
            } else if (e.type === 'commit_file') {
                type = 'FILE';
            }
            return new FileSystemEntry(name, '/' + e.path, this.dataSource, type);
        });
    }

    private createNextPage(data, path: string): () => Observable<FileSystemEntry> {
        const url = data.next && new URL(data.next);
        const hasNextPage = !!data.next && url.searchParams.has('page');

        if (hasNextPage) {
            return () => new Observable(subscriber => {
                const page = url.searchParams.get('page');

                this.bitbucketClient.resolvePath(path, page)
                    .pipe(
                        map(d => this.createFileSystemEntry(path, d)),
                        tap(res => {
                            subscriber.next(res);
                            subscriber.complete();
                        })
                    )
                    .subscribe();
            });
        } else {
            return null;
        }
    }

    resolveFile(path: string): Observable<File> {
        return this.bitbucketClient.resolvePath(path)
            .pipe(map(data => {
                const fileSystemEntry = this.createFileSystemEntry(path, data);

                if (fileSystemEntry.type !== 'FILE') {
                    throw new Error('This is not a file!!!');
                } else {
                    return new File(fileSystemEntry, data.data);
                }
            }));
    }

    refresh(): Observable<void> {
        return this.bitbucketClient.refresh()
            .pipe(map(() => {
                return;
            }));
    }
}
