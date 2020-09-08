import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenantInventorymasterComponent } from './edit-tenant-inventorymaster.component';

describe('EditTenantInventorymasterComponent', () => {
  let component: EditTenantInventorymasterComponent;
  let fixture: ComponentFixture<EditTenantInventorymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTenantInventorymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTenantInventorymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
