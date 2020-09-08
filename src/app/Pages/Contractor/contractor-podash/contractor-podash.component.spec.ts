import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPODashComponent } from './contractor-podash.component';

describe('ContractorPODashComponent', () => {
  let component: ContractorPODashComponent;
  let fixture: ComponentFixture<ContractorPODashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorPODashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPODashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
