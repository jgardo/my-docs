import { Observable } from 'rxjs';
import { FileSystemEntry } from './model/file-system-entry';
import { DataSource } from './model/data-source';
import { File } from './model/file';

export interface FileSystemFacade {
    getDataSource(): DataSource;
    resolvePath(path: string): Observable<FileSystemEntry>;
    resolveFile(path: string): Observable<File>;
}
