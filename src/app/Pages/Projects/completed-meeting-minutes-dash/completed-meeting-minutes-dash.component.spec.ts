import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedMeetingMinutesDashComponent } from './completed-meeting-minutes-dash.component';

describe('CompletedMeetingMinutesDashComponent', () => {
  let component: CompletedMeetingMinutesDashComponent;
  let fixture: ComponentFixture<CompletedMeetingMinutesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedMeetingMinutesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedMeetingMinutesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
