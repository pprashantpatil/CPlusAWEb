import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryDashboardComponent } from './employee-salary-dashboard.component';

describe('EmployeeSalaryDashboardComponent', () => {
  let component: EmployeeSalaryDashboardComponent;
  let fixture: ComponentFixture<EmployeeSalaryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSalaryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
