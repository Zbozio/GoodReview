import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagsForBooksComponent } from './add-tags-for-books.component';

describe('AddTagsForBooksComponent', () => {
  let component: AddTagsForBooksComponent;
  let fixture: ComponentFixture<AddTagsForBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTagsForBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTagsForBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
