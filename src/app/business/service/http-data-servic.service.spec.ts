import { TestBed } from '@angular/core/testing';

import { HttpDataServicService } from './http-data-servic.service';

describe('HttpDataServicService', () => {
  let service: HttpDataServicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataServicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
