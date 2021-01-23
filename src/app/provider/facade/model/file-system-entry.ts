import { DataSource } from './data-source';
import { Observable } from 'rxjs';

export class FileSystemEntry {
    constructor(
        public name: string,
        public path: string,
        public dataSource: DataSource,
        public type: 'FILE' | 'DIRECTORY' | 'LINK',
        public entries?: FileSystemEntry[],
        public loadMoreEntries?: () => Observable<FileSystemEntry>
    ) {
        this.entries = this.entries || [];

        if (!loadMoreEntries) {
            this.loadMoreEntries = null;
        }
    }
}
