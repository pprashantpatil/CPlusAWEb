import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorInvoiceComponent } from './contractor-invoice.component';

describe('ContractorInvoiceComponent', () => {
  let component: ContractorInvoiceComponent;
  let fixture: ComponentFixture<ContractorInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
