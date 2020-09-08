import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPhiliPayrollComponent } from './new-phili-payroll.component';

describe('NewPhiliPayrollComponent', () => {
  let component: NewPhiliPayrollComponent;
  let fixture: ComponentFixture<NewPhiliPayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPhiliPayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPhiliPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
