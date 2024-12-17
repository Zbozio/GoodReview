import { TestBed } from '@angular/core/testing';

import { FavoriteBooksServiceService } from './favorite-books-service.service';

describe('FavoriteBooksServiceService', () => {
  let service: FavoriteBooksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteBooksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
