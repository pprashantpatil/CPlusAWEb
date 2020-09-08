import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorDocumentsComponent } from './contractor-documents.component';

describe('ContractorDocumentsComponent', () => {
  let component: ContractorDocumentsComponent;
  let fixture: ComponentFixture<ContractorDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
