import { TestBed } from '@angular/core/testing';

import { BitbucketClientProviderService } from './bitbucket-client-provider.service';

describe('BitbucketClientProviderService', () => {
    let service: BitbucketClientProviderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BitbucketClientProviderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
