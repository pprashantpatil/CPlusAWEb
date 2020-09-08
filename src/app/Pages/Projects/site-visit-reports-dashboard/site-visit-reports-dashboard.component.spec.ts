import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteVisitReportsDashboardComponent } from './site-visit-reports-dashboard.component';

describe('SiteVisitReportsDashboardComponent', () => {
  let component: SiteVisitReportsDashboardComponent;
  let fixture: ComponentFixture<SiteVisitReportsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteVisitReportsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteVisitReportsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
