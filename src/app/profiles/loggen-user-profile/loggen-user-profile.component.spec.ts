import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggenUserProfileComponent } from './loggen-user-profile.component';

describe('LoggenUserProfileComponent', () => {
  let component: LoggenUserProfileComponent;
  let fixture: ComponentFixture<LoggenUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggenUserProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoggenUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
