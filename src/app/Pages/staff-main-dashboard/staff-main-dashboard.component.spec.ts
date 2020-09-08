import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMainDashboardComponent } from './staff-main-dashboard.component';

describe('StaffMainDashboardComponent', () => {
  let component: StaffMainDashboardComponent;
  let fixture: ComponentFixture<StaffMainDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMainDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
