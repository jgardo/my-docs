import { FileSystemEntry } from '../../provider/facade/model/file-system-entry';

export interface FileSystemViewer {
    setFileSystemEntry(fileSystemEntry: FileSystemEntry);
}
