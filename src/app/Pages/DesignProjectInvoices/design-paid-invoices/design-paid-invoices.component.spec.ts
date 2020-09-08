import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPaidInvoicesComponent } from './design-paid-invoices.component';

describe('DesignPaidInvoicesComponent', () => {
  let component: DesignPaidInvoicesComponent;
  let fixture: ComponentFixture<DesignPaidInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignPaidInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPaidInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
