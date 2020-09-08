import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousedashboardComponent } from './warehousedashboard.component';

describe('WarehousedashboardComponent', () => {
  let component: WarehousedashboardComponent;
  let fixture: ComponentFixture<WarehousedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehousedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
