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
            const entries = fse.map(e => {
                const name = e.path.substr(e.path.lastIndexOf('/') + 1);
                let type = null;
                if (e.type === 'commit_directory') {
                    type = 'DIRECTORY';
                } else if (e.type === 'commit_file') {
                    type = 'FILE';
                }
                return new FileSystemEntry(name, '/' + e.path, this.dataSource, type);
            });

            const nextPage = () => {
                // TODO BITBUCKET API DO NOT SUPPORT "page" parameter.
                // TODO Fix, when it would be supported.
                this.bitbucketClient.resolvePath(path, result.data.page + 1)
                    .pipe(
                        map(d => this.createFileSystemEntry(path, d)),
                        tap(res => {
                            entries.push(...res.entries);
                            result.data.page = result.data.page + 1;
                        })
                    ).subscribe();
            };

            return new FileSystemEntry(n, path, this.dataSource, 'DIRECTORY', entries, nextPage);
        } else {
            return new FileSystemEntry(n, path, this.dataSource, 'FILE', []);
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
}
