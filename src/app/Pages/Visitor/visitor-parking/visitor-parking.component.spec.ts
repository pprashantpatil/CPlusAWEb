import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorParkingComponent } from './visitor-parking.component';

describe('VisitorParkingComponent', () => {
  let component: VisitorParkingComponent;
  let fixture: ComponentFixture<VisitorParkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorParkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
