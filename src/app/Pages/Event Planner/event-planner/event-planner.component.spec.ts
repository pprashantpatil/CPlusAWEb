import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerComponent } from './event-planner.component';

describe('EventPlannerComponent', () => {
  let component: EventPlannerComponent;
  let fixture: ComponentFixture<EventPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
