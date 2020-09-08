import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaffExpensesComponent } from './new-staff-expenses.component';

describe('NewStaffExpensesComponent', () => {
  let component: NewStaffExpensesComponent;
  let fixture: ComponentFixture<NewStaffExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStaffExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStaffExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
