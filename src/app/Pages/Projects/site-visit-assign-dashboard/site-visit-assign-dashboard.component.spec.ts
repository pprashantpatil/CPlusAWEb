import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteVisitAssignDashboardComponent } from './site-visit-assign-dashboard.component';

describe('SiteVisitAssignDashboardComponent', () => {
  let component: SiteVisitAssignDashboardComponent;
  let fixture: ComponentFixture<SiteVisitAssignDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteVisitAssignDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteVisitAssignDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
