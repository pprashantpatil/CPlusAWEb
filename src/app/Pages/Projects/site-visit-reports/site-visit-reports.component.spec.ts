import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteVisitReportsComponent } from './site-visit-reports.component';

describe('SiteVisitReportsComponent', () => {
  let component: SiteVisitReportsComponent;
  let fixture: ComponentFixture<SiteVisitReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteVisitReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteVisitReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
