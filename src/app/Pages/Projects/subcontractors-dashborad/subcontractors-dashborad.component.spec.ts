import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorsDashboradComponent } from './subcontractors-dashborad.component';

describe('SubcontractorsDashboradComponent', () => {
  let component: SubcontractorsDashboradComponent;
  let fixture: ComponentFixture<SubcontractorsDashboradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcontractorsDashboradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorsDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
