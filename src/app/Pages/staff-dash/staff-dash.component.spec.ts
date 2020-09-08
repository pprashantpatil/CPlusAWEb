import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashComponent } from './staff-dash.component';

describe('StaffDashComponent', () => {
  let component: StaffDashComponent;
  let fixture: ComponentFixture<StaffDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
