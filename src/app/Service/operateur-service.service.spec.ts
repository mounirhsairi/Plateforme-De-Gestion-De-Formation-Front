import { TestBed } from '@angular/core/testing';

import { OperateurServiceService } from './operateur-service.service';

describe('OperateurServiceService', () => {
  let service: OperateurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperateurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
