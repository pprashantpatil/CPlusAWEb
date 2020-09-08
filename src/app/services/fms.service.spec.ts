import { TestBed } from '@angular/core/testing';

import { FmsService } from './fms.service';

describe('FmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FmsService = TestBed.get(FmsService);
    expect(service).toBeTruthy();
  });
});
