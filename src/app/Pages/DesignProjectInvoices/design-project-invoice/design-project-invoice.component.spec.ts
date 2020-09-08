import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignProjectInvoiceComponent } from './design-project-invoice.component';

describe('DesignProjectInvoiceComponent', () => {
  let component: DesignProjectInvoiceComponent;
  let fixture: ComponentFixture<DesignProjectInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignProjectInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignProjectInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
