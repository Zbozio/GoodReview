import { TestBed } from '@angular/core/testing';

import { AddingBookService } from './adding-book.service';

describe('AddingBookService', () => {
  let service: AddingBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddingBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
