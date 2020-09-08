import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaffPaymentsComponent } from './new-staff-payments.component';

describe('NewStaffPaymentsComponent', () => {
  let component: NewStaffPaymentsComponent;
  let fixture: ComponentFixture<NewStaffPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStaffPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStaffPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
