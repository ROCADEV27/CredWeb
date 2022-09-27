import { TestBed } from '@angular/core/testing';

import { MamaService } from './mama.service';

describe('MamaService', () => {
  let service: MamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
