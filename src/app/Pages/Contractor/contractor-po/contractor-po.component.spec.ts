import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPOComponent } from './contractor-po.component';

describe('ContractorPOComponent', () => {
  let component: ContractorPOComponent;
  let fixture: ComponentFixture<ContractorPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
