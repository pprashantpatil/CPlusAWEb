import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityPaymentsComponent } from './utility-payments.component';

describe('UtilityPaymentsComponent', () => {
  let component: UtilityPaymentsComponent;
  let fixture: ComponentFixture<UtilityPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
