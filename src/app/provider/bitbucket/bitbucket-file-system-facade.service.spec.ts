import { TestBed } from '@angular/core/testing';

import { BitbucketFileSystemFacadeService } from './bitbucket-file-system-facade.service';

describe('BitbucketFileSystemFacadeService', () => {
    let service: BitbucketFileSystemFacadeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BitbucketFileSystemFacadeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
