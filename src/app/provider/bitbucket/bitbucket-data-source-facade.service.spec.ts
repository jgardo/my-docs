import { TestBed } from '@angular/core/testing';

import { BitbucketDataSourceFacadeService } from './bitbucket-data-source-facade.service';

describe('BitbucketDataSourceFacadeService', () => {
  let service: BitbucketDataSourceFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitbucketDataSourceFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
