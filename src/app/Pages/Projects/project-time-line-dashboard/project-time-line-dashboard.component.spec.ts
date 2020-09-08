import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimeLineDashboardComponent } from './project-time-line-dashboard.component';

describe('ProjectTimeLineDashboardComponent', () => {
  let component: ProjectTimeLineDashboardComponent;
  let fixture: ComponentFixture<ProjectTimeLineDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTimeLineDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTimeLineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
