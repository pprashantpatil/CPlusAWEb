import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantmaintenancerequestdashboardComponent } from './tenantmaintenancerequestdashboard.component';

describe('TenantmaintenancerequestdashboardComponent', () => {
  let component: TenantmaintenancerequestdashboardComponent;
  let fixture: ComponentFixture<TenantmaintenancerequestdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantmaintenancerequestdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantmaintenancerequestdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
