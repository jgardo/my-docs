import { TestBed } from '@angular/core/testing';

import { BitbucketService } from './bitbucket.service';

describe('BitbucketService', () => {
  let service: BitbucketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitbucketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
