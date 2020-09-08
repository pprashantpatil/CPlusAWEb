import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingMinutesdashComponent } from './meeting-minutesdash.component';

describe('MeetingMinutesdashComponent', () => {
  let component: MeetingMinutesdashComponent;
  let fixture: ComponentFixture<MeetingMinutesdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingMinutesdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingMinutesdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
