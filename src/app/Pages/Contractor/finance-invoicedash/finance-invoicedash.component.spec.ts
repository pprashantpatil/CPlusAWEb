import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceInvoicedashComponent } from './finance-invoicedash.component';

describe('FinanceInvoicedashComponent', () => {
  let component: FinanceInvoicedashComponent;
  let fixture: ComponentFixture<FinanceInvoicedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceInvoicedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceInvoicedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
