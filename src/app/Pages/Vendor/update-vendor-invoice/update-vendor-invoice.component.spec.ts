import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVendorInvoiceComponent } from './update-vendor-invoice.component';

describe('UpdateVendorInvoiceComponent', () => {
  let component: UpdateVendorInvoiceComponent;
  let fixture: ComponentFixture<UpdateVendorInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVendorInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVendorInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
