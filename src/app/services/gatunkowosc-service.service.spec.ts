import { TestBed } from '@angular/core/testing';

import { GatunkowoscService } from './gatunkowosc-service.service';

describe('GatunkowoscServiceService', () => {
  let service: GatunkowoscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatunkowoscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
