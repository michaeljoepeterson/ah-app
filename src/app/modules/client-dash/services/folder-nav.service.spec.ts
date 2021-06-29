import { TestBed } from '@angular/core/testing';

import { FolderNavService } from './folder-nav.service';

describe('FolderNavService', () => {
  let service: FolderNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
