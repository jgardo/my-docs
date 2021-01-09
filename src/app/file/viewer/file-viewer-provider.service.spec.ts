import { TestBed } from '@angular/core/testing';

import { FileViewerProviderService } from './file-viewer-provider.service';

describe('FileViewerProviderService', () => {
  let service: FileViewerProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileViewerProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
