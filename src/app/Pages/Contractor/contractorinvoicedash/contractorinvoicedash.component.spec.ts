import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorinvoicedashComponent } from './contractorinvoicedash.component';

describe('ContractorinvoicedashComponent', () => {
  let component: ContractorinvoicedashComponent;
  let fixture: ComponentFixture<ContractorinvoicedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorinvoicedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorinvoicedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
