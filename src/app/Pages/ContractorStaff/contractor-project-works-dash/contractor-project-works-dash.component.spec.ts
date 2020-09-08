import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorProjectWorksDashComponent } from './contractor-project-works-dash.component';

describe('ContractorProjectWorksDashComponent', () => {
  let component: ContractorProjectWorksDashComponent;
  let fixture: ComponentFixture<ContractorProjectWorksDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorProjectWorksDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorProjectWorksDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
