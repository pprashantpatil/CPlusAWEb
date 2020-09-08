import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffWorkComponent } from './edit-staff-work.component';

describe('EditStaffWorkComponent', () => {
  let component: EditStaffWorkComponent;
  let fixture: ComponentFixture<EditStaffWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStaffWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStaffWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
