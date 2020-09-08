import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantcomplaintdashboardComponent } from './tenantcomplaintdashboard.component';

describe('TenantcomplaintdashboardComponent', () => {
  let component: TenantcomplaintdashboardComponent;
  let fixture: ComponentFixture<TenantcomplaintdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantcomplaintdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantcomplaintdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
