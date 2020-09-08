import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountDetailsComponent } from './new-account-details.component';

describe('NewAccountDetailsComponent', () => {
  let component: NewAccountDetailsComponent;
  let fixture: ComponentFixture<NewAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
