import { TestBed } from '@angular/core/testing';

import { TypeOfAuthorService } from './type-of-author.service';

describe('TypeOfAuthorService', () => {
  let service: TypeOfAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
