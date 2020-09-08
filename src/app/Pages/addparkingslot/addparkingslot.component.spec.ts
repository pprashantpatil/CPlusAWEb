import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddparkingslotComponent } from './addparkingslot.component';

describe('AddparkingslotComponent', () => {
  let component: AddparkingslotComponent;
  let fixture: ComponentFixture<AddparkingslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddparkingslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddparkingslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
