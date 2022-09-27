import { TestBed } from '@angular/core/testing';

import { AlumnotutorService } from './alumnotutor.service';

describe('AlumnotutorService', () => {
  let service: AlumnotutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnotutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
