import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantInventorymasterComponent } from './tenant-inventorymaster.component';

describe('TenantInventorymasterComponent', () => {
  let component: TenantInventorymasterComponent;
  let fixture: ComponentFixture<TenantInventorymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantInventorymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantInventorymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
