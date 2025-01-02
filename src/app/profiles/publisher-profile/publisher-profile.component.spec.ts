import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherProfileComponent } from './publisher-profile.component';

describe('PublisherProfileComponent', () => {
  let component: PublisherProfileComponent;
  let fixture: ComponentFixture<PublisherProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublisherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
