import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullInventoryReportComponent } from './full-inventory-report.component';

describe('FullInventoryReportComponent', () => {
  let component: FullInventoryReportComponent;
  let fixture: ComponentFixture<FullInventoryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullInventoryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullInventoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
