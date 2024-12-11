import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingProfileComponent } from './starting-profile.component';

describe('StartingProfileComponent', () => {
  let component: StartingProfileComponent;
  let fixture: ComponentFixture<StartingProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartingProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
