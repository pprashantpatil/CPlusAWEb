import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorStaffDetailsComponent } from './contractor-staff-details.component';

describe('ContractorStaffDetailsComponent', () => {
  let component: ContractorStaffDetailsComponent;
  let fixture: ComponentFixture<ContractorStaffDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorStaffDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
