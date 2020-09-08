import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayGComponent } from './new-pay-g.component';

describe('NewPayGComponent', () => {
  let component: NewPayGComponent;
  let fixture: ComponentFixture<NewPayGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPayGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
