import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorStaffLeavesDashComponent } from './contractor-staff-leaves-dash.component';

describe('ContractorStaffLeavesDashComponent', () => {
  let component: ContractorStaffLeavesDashComponent;
  let fixture: ComponentFixture<ContractorStaffLeavesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorStaffLeavesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorStaffLeavesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
