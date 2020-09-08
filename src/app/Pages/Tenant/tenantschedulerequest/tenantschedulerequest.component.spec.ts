import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantschedulerequestComponent } from './tenantschedulerequest.component';

describe('TenantschedulerequestComponent', () => {
  let component: TenantschedulerequestComponent;
  let fixture: ComponentFixture<TenantschedulerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantschedulerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantschedulerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
