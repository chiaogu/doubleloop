import { TestBed, inject } from '@angular/core/testing';

import { BrickService } from './brick.service';

describe('BrickService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrickService]
    });
  });

  it('should be created', inject([BrickService], (service: BrickService) => {
    expect(service).toBeTruthy();
  }));
});
