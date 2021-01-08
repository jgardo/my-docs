import {FileSystemFacade} from '../facade/file-system-facade';
import {Observable} from 'rxjs';
import {FileSystemEntry} from '../facade/model/file-system-entry';
import {BitbucketClient} from './bitbucket-client';
import {map} from 'rxjs/operators';
import {Schema} from 'bitbucket';
import Treeentry = Schema.Treeentry;
import {DataSource} from '../facade/model/data-source';

export class BitbucketFileSystemFacadeService implements FileSystemFacade {

  constructor(
      private dataSource: DataSource,
      private bitbucketClient: BitbucketClient,
  ) { }

    getDataSource(): DataSource {
        return this.dataSource;
    }

  resolvePath(path: string): Observable<FileSystemEntry> {
      return this.bitbucketClient.resolvePath(path)
        .pipe(map(data => {
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
                return new FileSystemEntry(n, path, this.dataSource, 'DIRECTORY', entries);
            } else {
                return new FileSystemEntry(n, path, this.dataSource, 'FILE', [], data);
            }
        }));
  }
}
