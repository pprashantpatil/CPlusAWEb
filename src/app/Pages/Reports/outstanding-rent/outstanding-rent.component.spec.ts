import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingRentComponent } from './outstanding-rent.component';

describe('OutstandingRentComponent', () => {
  let component: OutstandingRentComponent;
  let fixture: ComponentFixture<OutstandingRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
