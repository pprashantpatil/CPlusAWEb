import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentReportComponent } from './vendor-payment-report.component';

describe('VendorPaymentReportComponent', () => {
  let component: VendorPaymentReportComponent;
  let fixture: ComponentFixture<VendorPaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
