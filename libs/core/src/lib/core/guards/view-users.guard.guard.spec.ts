import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewUsersGuardGuard } from './view-users.guard.guard';

describe('viewUsersGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewUsersGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
