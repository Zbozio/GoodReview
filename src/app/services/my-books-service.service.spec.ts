import { TestBed } from '@angular/core/testing';

import { MyBooksService } from './my-books-service';

describe('MyBooksServiceService', () => {
  let service: MyBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
