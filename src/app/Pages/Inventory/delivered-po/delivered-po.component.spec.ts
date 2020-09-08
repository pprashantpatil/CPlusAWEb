import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredPOComponent } from './delivered-po.component';

describe('DeliveredPOComponent', () => {
  let component: DeliveredPOComponent;
  let fixture: ComponentFixture<DeliveredPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveredPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
