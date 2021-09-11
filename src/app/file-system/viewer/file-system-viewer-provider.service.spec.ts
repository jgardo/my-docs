import { TestBed } from '@angular/core/testing';

import { FileSystemViewerProviderService } from './file-system-viewer-provider.service';

describe('FileViewerProviderService', () => {
  let service: FileSystemViewerProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSystemViewerProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
