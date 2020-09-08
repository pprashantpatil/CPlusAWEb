import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressDashboardComponent } from './project-progress-dashboard.component';

describe('ProjectProgressDashboardComponent', () => {
  let component: ProjectProgressDashboardComponent;
  let fixture: ComponentFixture<ProjectProgressDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProgressDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
