import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderReportComponent } from './new-order-report.component';

describe('NewOrderReportComponent', () => {
  let component: NewOrderReportComponent;
  let fixture: ComponentFixture<NewOrderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
