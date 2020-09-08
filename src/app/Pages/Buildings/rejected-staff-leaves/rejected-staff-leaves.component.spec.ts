import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStaffLeavesComponent } from './rejected-staff-leaves.component';

describe('RejectedStaffLeavesComponent', () => {
  let component: RejectedStaffLeavesComponent;
  let fixture: ComponentFixture<RejectedStaffLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedStaffLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStaffLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
