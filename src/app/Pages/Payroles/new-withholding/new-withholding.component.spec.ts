import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWithholdingComponent } from './new-withholding.component';

describe('NewWithholdingComponent', () => {
  let component: NewWithholdingComponent;
  let fixture: ComponentFixture<NewWithholdingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWithholdingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWithholdingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
