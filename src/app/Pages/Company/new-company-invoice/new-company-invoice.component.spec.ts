import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyInvoiceComponent } from './new-company-invoice.component';

describe('NewCompanyInvoiceComponent', () => {
  let component: NewCompanyInvoiceComponent;
  let fixture: ComponentFixture<NewCompanyInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompanyInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
