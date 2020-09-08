import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchListAssignsComponent } from './punch-list-assigns.component';

describe('PunchListAssignsComponent', () => {
  let component: PunchListAssignsComponent;
  let fixture: ComponentFixture<PunchListAssignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchListAssignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchListAssignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
