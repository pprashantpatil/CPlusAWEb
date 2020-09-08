import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReturnDashboardComponent } from './vendor-return-dashboard.component';

describe('VendorReturnDashboardComponent', () => {
  let component: VendorReturnDashboardComponent;
  let fixture: ComponentFixture<VendorReturnDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorReturnDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReturnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
