import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStaffLeavesComponent } from './approved-staff-leaves.component';

describe('ApprovedStaffLeavesComponent', () => {
  let component: ApprovedStaffLeavesComponent;
  let fixture: ComponentFixture<ApprovedStaffLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedStaffLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedStaffLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
