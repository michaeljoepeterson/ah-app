import { TestBed } from '@angular/core/testing';

import { PatientFileService } from './patient-file.service';

describe('PatientFileService', () => {
  let service: PatientFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
