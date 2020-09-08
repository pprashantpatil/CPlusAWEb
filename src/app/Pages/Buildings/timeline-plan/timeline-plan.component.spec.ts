import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePlanComponent } from './timeline-plan.component';

describe('TimelinePlanComponent', () => {
  let component: TimelinePlanComponent;
  let fixture: ComponentFixture<TimelinePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
