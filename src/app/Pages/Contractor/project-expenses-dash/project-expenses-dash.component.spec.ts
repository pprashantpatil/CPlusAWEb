import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectExpensesDashComponent } from './project-expenses-dash.component';

describe('ProjectExpensesDashComponent', () => {
  let component: ProjectExpensesDashComponent;
  let fixture: ComponentFixture<ProjectExpensesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectExpensesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectExpensesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
