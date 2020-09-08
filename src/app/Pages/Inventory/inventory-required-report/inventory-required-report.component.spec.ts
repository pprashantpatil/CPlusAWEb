import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRequiredReportComponent } from './inventory-required-report.component';

describe('InventoryRequiredReportComponent', () => {
  let component: InventoryRequiredReportComponent;
  let fixture: ComponentFixture<InventoryRequiredReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRequiredReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRequiredReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
