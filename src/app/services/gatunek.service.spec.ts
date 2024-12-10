import { TestBed } from '@angular/core/testing';

import { GatunekService } from './gatunek.service';

describe('GatunekService', () => {
  let service: GatunekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatunekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
