import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParkingAllocationComponent } from './new-parking-allocation.component';

describe('NewParkingAllocationComponent', () => {
  let component: NewParkingAllocationComponent;
  let fixture: ComponentFixture<NewParkingAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewParkingAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParkingAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
