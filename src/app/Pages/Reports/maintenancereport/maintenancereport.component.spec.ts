import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancereportComponent } from './maintenancereport.component';

describe('MaintenancereportComponent', () => {
  let component: MaintenancereportComponent;
  let fixture: ComponentFixture<MaintenancereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
