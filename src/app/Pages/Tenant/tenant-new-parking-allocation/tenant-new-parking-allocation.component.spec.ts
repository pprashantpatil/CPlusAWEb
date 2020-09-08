import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantNewParkingAllocationComponent } from './tenant-new-parking-allocation.component';

describe('TenantNewParkingAllocationComponent', () => {
  let component: TenantNewParkingAllocationComponent;
  let fixture: ComponentFixture<TenantNewParkingAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantNewParkingAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantNewParkingAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
