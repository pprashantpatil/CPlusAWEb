import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorDocumentsDashboardComponent } from './contractor-documents-dashboard.component';

describe('ContractorDocumentsDashboardComponent', () => {
  let component: ContractorDocumentsDashboardComponent;
  let fixture: ComponentFixture<ContractorDocumentsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorDocumentsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorDocumentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
