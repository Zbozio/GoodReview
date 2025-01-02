import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptFriendRequestsComponent } from './accept-friend-requests.component';

describe('AcceptFriendRequestsComponent', () => {
  let component: AcceptFriendRequestsComponent;
  let fixture: ComponentFixture<AcceptFriendRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptFriendRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptFriendRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
