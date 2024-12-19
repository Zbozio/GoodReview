import { TestBed } from '@angular/core/testing';

import { FavoriteGenresService } from './favorite-genres-service';

describe('FavoriteBooksService', () => {
  let service: FavoriteGenresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteGenresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
