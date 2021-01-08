import { Observable } from 'rxjs';
import { FileSystemEntry } from './model/file-system-entry';
import { DataSource } from './model/data-source';

export interface FileSystemFacade {
    getDataSource(): DataSource;

    resolvePath(path: string): Observable<FileSystemEntry>;
}
