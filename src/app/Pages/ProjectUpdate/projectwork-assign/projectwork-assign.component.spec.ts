import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectworkAssignComponent } from './projectwork-assign.component';

describe('ProjectworkAssignComponent', () => {
  let component: ProjectworkAssignComponent;
  let fixture: ComponentFixture<ProjectworkAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectworkAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectworkAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
