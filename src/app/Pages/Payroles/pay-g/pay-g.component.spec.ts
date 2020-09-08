import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGComponent } from './pay-g.component';

describe('PayGComponent', () => {
  let component: PayGComponent;
  let fixture: ComponentFixture<PayGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
