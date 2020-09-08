import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsalaryComponent } from './staffsalary.component';

describe('StaffsalaryComponent', () => {
  let component: StaffsalaryComponent;
  let fixture: ComponentFixture<StaffsalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
