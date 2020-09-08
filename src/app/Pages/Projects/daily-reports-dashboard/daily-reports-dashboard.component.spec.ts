import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportsDashboardComponent } from './daily-reports-dashboard.component';

describe('DailyReportsDashboardComponent', () => {
  let component: DailyReportsDashboardComponent;
  let fixture: ComponentFixture<DailyReportsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyReportsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyReportsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
