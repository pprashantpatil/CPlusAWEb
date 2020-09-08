import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorStaffApplyLeavesComponent } from './contractor-staff-apply-leaves.component';

describe('ContractorStaffApplyLeavesComponent', () => {
  let component: ContractorStaffApplyLeavesComponent;
  let fixture: ComponentFixture<ContractorStaffApplyLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorStaffApplyLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorStaffApplyLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
