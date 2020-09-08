import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessReportComponent } from './access-report.component';

describe('AccessReportComponent', () => {
  let component: AccessReportComponent;
  let fixture: ComponentFixture<AccessReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
