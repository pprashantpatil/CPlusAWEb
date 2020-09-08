import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewinspectionComponent } from './newinspection.component';

describe('NewinspectionComponent', () => {
  let component: NewinspectionComponent;
  let fixture: ComponentFixture<NewinspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewinspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewinspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
