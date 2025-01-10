import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBooksComponentComponent } from './list-of-books-component.component';

describe('ListOfBooksComponentComponent', () => {
  let component: ListOfBooksComponentComponent;
  let fixture: ComponentFixture<ListOfBooksComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfBooksComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfBooksComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
