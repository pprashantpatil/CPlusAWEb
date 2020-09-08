import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupstaffattendanceComponent } from './supstaffattendance.component';

describe('SupstaffattendanceComponent', () => {
  let component: SupstaffattendanceComponent;
  let fixture: ComponentFixture<SupstaffattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupstaffattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupstaffattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
