import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUpdateMenuDashComponent } from './daily-update-menu-dash.component';

describe('DailyUpdateMenuDashComponent', () => {
  let component: DailyUpdateMenuDashComponent;
  let fixture: ComponentFixture<DailyUpdateMenuDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyUpdateMenuDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUpdateMenuDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
