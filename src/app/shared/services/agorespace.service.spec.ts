import { TestBed } from '@angular/core/testing';

import { AgorespaceService } from './agorespace.service';

describe('AgorespaceService', () => {
  let service: AgorespaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgorespaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
