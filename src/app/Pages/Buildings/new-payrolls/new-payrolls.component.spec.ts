import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayrollsComponent } from './new-payrolls.component';

describe('NewPayrollsComponent', () => {
  let component: NewPayrollsComponent;
  let fixture: ComponentFixture<NewPayrollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPayrollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayrollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
