import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorprojectworkdashboardComponent } from './contractorprojectworkdashboard.component';

describe('ContractorprojectworkdashboardComponent', () => {
  let component: ContractorprojectworkdashboardComponent;
  let fixture: ComponentFixture<ContractorprojectworkdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorprojectworkdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorprojectworkdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
