import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingDashComponent } from './job-posting-dash.component';

describe('JobPostingDashComponent', () => {
  let component: JobPostingDashComponent;
  let fixture: ComponentFixture<JobPostingDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostingDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostingDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
