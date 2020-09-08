import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimeLineComponent } from './project-time-line.component';

describe('ProjectTimeLineComponent', () => {
  let component: ProjectTimeLineComponent;
  let fixture: ComponentFixture<ProjectTimeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTimeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
