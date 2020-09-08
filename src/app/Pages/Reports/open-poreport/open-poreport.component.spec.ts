import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPOReportComponent } from './open-poreport.component';

describe('OpenPOReportComponent', () => {
  let component: OpenPOReportComponent;
  let fixture: ComponentFixture<OpenPOReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPOReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPOReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
