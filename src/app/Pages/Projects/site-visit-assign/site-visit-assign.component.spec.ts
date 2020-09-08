import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteVisitAssignComponent } from './site-visit-assign.component';

describe('SiteVisitAssignComponent', () => {
  let component: SiteVisitAssignComponent;
  let fixture: ComponentFixture<SiteVisitAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteVisitAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteVisitAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
