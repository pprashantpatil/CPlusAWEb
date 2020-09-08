import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHolidaysComponent } from './new-holidays.component';

describe('NewHolidaysComponent', () => {
  let component: NewHolidaysComponent;
  let fixture: ComponentFixture<NewHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
