import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchListAssignDashboardComponent } from './punch-list-assign-dashboard.component';

describe('PunchListAssignDashboardComponent', () => {
  let component: PunchListAssignDashboardComponent;
  let fixture: ComponentFixture<PunchListAssignDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchListAssignDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchListAssignDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
