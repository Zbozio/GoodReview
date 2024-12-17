import { TestBed } from '@angular/core/testing';

import { GatunkowoscServiceService } from './gatunkowosc-service.service';

describe('GatunkowoscServiceService', () => {
  let service: GatunkowoscServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatunkowoscServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
