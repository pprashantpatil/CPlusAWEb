import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectworkAssignDashComponent } from './projectwork-assign-dash.component';

describe('ProjectworkAssignDashComponent', () => {
  let component: ProjectworkAssignDashComponent;
  let fixture: ComponentFixture<ProjectworkAssignDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectworkAssignDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectworkAssignDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
