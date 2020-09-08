import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffExpensesComponent } from './staff-expenses.component';

describe('StaffExpensesComponent', () => {
  let component: StaffExpensesComponent;
  let fixture: ComponentFixture<StaffExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
