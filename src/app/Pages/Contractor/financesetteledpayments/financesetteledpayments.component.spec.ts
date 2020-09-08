import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesetteledpaymentsComponent } from './financesetteledpayments.component';

describe('FinancesetteledpaymentsComponent', () => {
  let component: FinancesetteledpaymentsComponent;
  let fixture: ComponentFixture<FinancesetteledpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancesetteledpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesetteledpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
