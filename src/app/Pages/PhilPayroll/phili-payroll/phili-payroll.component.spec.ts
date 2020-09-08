import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhiliPayrollComponent } from './phili-payroll.component';

describe('PhiliPayrollComponent', () => {
  let component: PhiliPayrollComponent;
  let fixture: ComponentFixture<PhiliPayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhiliPayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhiliPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
