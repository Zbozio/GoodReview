import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTimelineComponent } from './main-timeline.component';

describe('MainTimelineComponent', () => {
  let component: MainTimelineComponent;
  let fixture: ComponentFixture<MainTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
