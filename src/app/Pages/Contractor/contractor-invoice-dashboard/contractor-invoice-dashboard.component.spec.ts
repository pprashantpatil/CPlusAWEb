import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorInvoiceDashboardComponent } from './contractor-invoice-dashboard.component';

describe('ContractorInvoiceDashboardComponent', () => {
  let component: ContractorInvoiceDashboardComponent;
  let fixture: ComponentFixture<ContractorInvoiceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorInvoiceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorInvoiceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
