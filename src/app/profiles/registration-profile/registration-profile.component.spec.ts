import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProfileComponent } from './registration-profile.component';

describe('RegistrationProfileComponent', () => {
  let component: RegistrationProfileComponent;
  let fixture: ComponentFixture<RegistrationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
