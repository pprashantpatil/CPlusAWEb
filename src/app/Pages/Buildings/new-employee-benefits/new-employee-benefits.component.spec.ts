import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeBenefitsComponent } from './new-employee-benefits.component';

describe('NewEmployeeBenefitsComponent', () => {
  let component: NewEmployeeBenefitsComponent;
  let fixture: ComponentFixture<NewEmployeeBenefitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmployeeBenefitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmployeeBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
