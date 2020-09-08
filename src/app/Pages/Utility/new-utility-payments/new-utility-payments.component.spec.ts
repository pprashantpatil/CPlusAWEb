import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUtilityPaymentsComponent } from './new-utility-payments.component';

describe('NewUtilityPaymentsComponent', () => {
  let component: NewUtilityPaymentsComponent;
  let fixture: ComponentFixture<NewUtilityPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUtilityPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUtilityPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
