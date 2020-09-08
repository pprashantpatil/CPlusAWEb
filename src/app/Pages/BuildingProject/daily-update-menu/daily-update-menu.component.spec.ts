import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUpdateMenuComponent } from './daily-update-menu.component';

describe('DailyUpdateMenuComponent', () => {
  let component: DailyUpdateMenuComponent;
  let fixture: ComponentFixture<DailyUpdateMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyUpdateMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUpdateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
