import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffWorkdashComponent } from './staff-workdash.component';

describe('StaffWorkdashComponent', () => {
  let component: StaffWorkdashComponent;
  let fixture: ComponentFixture<StaffWorkdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffWorkdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffWorkdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
