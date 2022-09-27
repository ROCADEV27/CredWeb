import { TestBed } from '@angular/core/testing';

import { PapaService } from './papa.service';

describe('PapaService', () => {
  let service: PapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
