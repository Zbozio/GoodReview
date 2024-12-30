import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfAuthorComponent } from './type-of-author.component';

describe('TypeOfAuthorComponent', () => {
  let component: TypeOfAuthorComponent;
  let fixture: ComponentFixture<TypeOfAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeOfAuthorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeOfAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
