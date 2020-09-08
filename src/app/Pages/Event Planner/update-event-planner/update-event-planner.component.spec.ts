import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventPlannerComponent } from './update-event-planner.component';

describe('UpdateEventPlannerComponent', () => {
  let component: UpdateEventPlannerComponent;
  let fixture: ComponentFixture<UpdateEventPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEventPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEventPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
