import { TestBed } from '@angular/core/testing';

import { FileSystemFacadeCacheService } from './file-system-facade-cache.service';

describe('FileSystemFacadeCacheService', () => {
    let service: FileSystemFacadeCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FileSystemFacadeCacheService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
