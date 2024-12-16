import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userIdGuardGuard } from './user-id-guard.guard';

describe('userIdGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userIdGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
