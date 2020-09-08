import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRequestComponent } from './doctor-request.component';

describe('DoctorRequestComponent', () => {
  let component: DoctorRequestComponent;
  let fixture: ComponentFixture<DoctorRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
