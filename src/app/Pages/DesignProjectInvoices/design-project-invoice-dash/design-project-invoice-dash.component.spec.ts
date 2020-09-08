import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignProjectInvoiceDashComponent } from './design-project-invoice-dash.component';

describe('DesignProjectInvoiceDashComponent', () => {
  let component: DesignProjectInvoiceDashComponent;
  let fixture: ComponentFixture<DesignProjectInvoiceDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignProjectInvoiceDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignProjectInvoiceDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
