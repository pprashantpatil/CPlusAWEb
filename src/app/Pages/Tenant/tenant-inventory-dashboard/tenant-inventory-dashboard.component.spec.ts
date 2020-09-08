import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantInventoryDashboardComponent } from './tenant-inventory-dashboard.component';

describe('TenantInventoryDashboardComponent', () => {
  let component: TenantInventoryDashboardComponent;
  let fixture: ComponentFixture<TenantInventoryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantInventoryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantInventoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
