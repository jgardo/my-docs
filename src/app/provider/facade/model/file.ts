import { FileSystemEntry } from './file-system-entry';

export class File {
    constructor(
        public fileSystemEntry: FileSystemEntry,
        public content: string
    ) {

    }
}
