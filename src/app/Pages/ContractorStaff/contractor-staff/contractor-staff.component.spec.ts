import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorStaffComponent } from './contractor-staff.component';

describe('ContractorStaffComponent', () => {
  let component: ContractorStaffComponent;
  let fixture: ComponentFixture<ContractorStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
