import { TestBed } from '@angular/core/testing';

import { FiFServiceService } from './fifservice.service';

describe('FiFServiceService', () => {
  let service: FiFServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiFServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
