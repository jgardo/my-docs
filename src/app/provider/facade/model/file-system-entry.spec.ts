import { FileSystemEntry } from './file-system-entry';

describe('FileSystemEntry', () => {
    it('should create an instance', () => {
        expect(new FileSystemEntry(null, null, null, null)).toBeTruthy();
    });
});
