import { TestBed } from '@angular/core/testing';

import { ListOfBooksService } from './list-of-books.service';

describe('ListOfBooksService', () => {
  let service: ListOfBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
