import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenetParkingAllocationComponent } from './tenet-parking-allocation.component';

describe('TenetParkingAllocationComponent', () => {
  let component: TenetParkingAllocationComponent;
  let fixture: ComponentFixture<TenetParkingAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenetParkingAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenetParkingAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
