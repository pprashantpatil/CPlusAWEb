import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentsDashboardComponent } from './vendor-payments-dashboard.component';

describe('VendorPaymentsDashboardComponent', () => {
  let component: VendorPaymentsDashboardComponent;
  let fixture: ComponentFixture<VendorPaymentsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPaymentsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
