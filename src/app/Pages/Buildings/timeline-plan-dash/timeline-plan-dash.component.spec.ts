import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePlanDashComponent } from './timeline-plan-dash.component';

describe('TimelinePlanDashComponent', () => {
  let component: TimelinePlanDashComponent;
  let fixture: ComponentFixture<TimelinePlanDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinePlanDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePlanDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
