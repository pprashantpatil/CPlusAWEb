import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidContractorInvoicesComponent } from './paid-contractor-invoices.component';

describe('PaidContractorInvoicesComponent', () => {
  let component: PaidContractorInvoicesComponent;
  let fixture: ComponentFixture<PaidContractorInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidContractorInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidContractorInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
