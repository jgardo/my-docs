import { DataSource } from './data-source';

export class FileSystemEntry {
    constructor(
        public name: string,
        public path: string,
        public dataSource: DataSource,
        public type: 'FILE' | 'DIRECTORY' | 'LINK',
        public entries?: FileSystemEntry[],
        public content?: string,
    ) {

    }
}
