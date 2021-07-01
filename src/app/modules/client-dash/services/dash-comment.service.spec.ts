import { TestBed } from '@angular/core/testing';

import { DashCommentService } from './dash-comment.service';

describe('DashCommentService', () => {
  let service: DashCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
