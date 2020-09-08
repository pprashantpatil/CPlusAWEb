import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceprojectprogressdashComponent } from './financeprojectprogressdash.component';

describe('FinanceprojectprogressdashComponent', () => {
  let component: FinanceprojectprogressdashComponent;
  let fixture: ComponentFixture<FinanceprojectprogressdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceprojectprogressdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceprojectprogressdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
