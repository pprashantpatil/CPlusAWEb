import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectAssignComponent } from './new-project-assign.component';

describe('NewProjectAssignComponent', () => {
  let component: NewProjectAssignComponent;
  let fixture: ComponentFixture<NewProjectAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
