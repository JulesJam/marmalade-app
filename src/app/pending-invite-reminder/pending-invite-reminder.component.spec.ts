import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInviteReminderComponent } from './pending-invite-reminder.component';

describe('PendingInviteReminderComponent', () => {
  let component: PendingInviteReminderComponent;
  let fixture: ComponentFixture<PendingInviteReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingInviteReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingInviteReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
