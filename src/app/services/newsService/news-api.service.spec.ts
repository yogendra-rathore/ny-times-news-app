import { TestBed } from '@angular/core/testing';

import { NewsApiService } from './news-api.service';

describe('NewsApiService', () => {
  let service: NewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsApiService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
