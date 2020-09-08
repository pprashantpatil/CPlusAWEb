import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorProjectWorksComponent } from './contractor-project-works.component';

describe('ContractorProjectWorksComponent', () => {
  let component: ContractorProjectWorksComponent;
  let fixture: ComponentFixture<ContractorProjectWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorProjectWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorProjectWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
