import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationPageComponent } from './recommendation-page.component';

describe('RecommendationPageComponent', () => {
  let component: RecommendationPageComponent;
  let fixture: ComponentFixture<RecommendationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommendationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
