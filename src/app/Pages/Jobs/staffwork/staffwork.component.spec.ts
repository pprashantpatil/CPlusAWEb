import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffworkComponent } from './staffwork.component';

describe('StaffworkComponent', () => {
  let component: StaffworkComponent;
  let fixture: ComponentFixture<StaffworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
