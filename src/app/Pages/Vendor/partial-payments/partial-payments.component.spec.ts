import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialPaymentsComponent } from './partial-payments.component';

describe('PartialPaymentsComponent', () => {
  let component: PartialPaymentsComponent;
  let fixture: ComponentFixture<PartialPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
