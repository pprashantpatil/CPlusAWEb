import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressDashComponent } from './project-progress-dash.component';

describe('ProjectProgressDashComponent', () => {
  let component: ProjectProgressDashComponent;
  let fixture: ComponentFixture<ProjectProgressDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProgressDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
