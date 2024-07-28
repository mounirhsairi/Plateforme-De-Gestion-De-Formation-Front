import { TestBed } from '@angular/core/testing';

import { ProgramServiceService } from './program-service.service';

describe('ProgramServiceService', () => {
  let service: ProgramServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
