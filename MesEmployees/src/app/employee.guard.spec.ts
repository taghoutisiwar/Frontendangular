import { TestBed } from '@angular/core/testing';

import {PermissionsService } from './employee.guard';

describe('EmployeeGuard', () => {
  let guard: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissionsService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});