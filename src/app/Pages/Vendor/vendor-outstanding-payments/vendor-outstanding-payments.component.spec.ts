import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOutstandingPaymentsComponent } from './vendor-outstanding-payments.component';

describe('VendorOutstandingPaymentsComponent', () => {
  let component: VendorOutstandingPaymentsComponent;
  let fixture: ComponentFixture<VendorOutstandingPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOutstandingPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOutstandingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
