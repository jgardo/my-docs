import { FileSystemEntry } from '../../provider/facade/model/file-system-entry';
import { FileSystemFacade } from '../../provider/facade/file-system-facade';

export interface FileSystemViewer {
    setFileSystemEntry(fileSystemEntry: FileSystemEntry);
    setFileSystemFacade(fileSystemFacade: FileSystemFacade);
}
