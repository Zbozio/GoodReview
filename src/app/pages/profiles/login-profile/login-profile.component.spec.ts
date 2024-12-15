import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProfileComponent } from './login-profile.component';

describe('LoginProfileComponent', () => {
  let component: LoginProfileComponent;
  let fixture: ComponentFixture<LoginProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
