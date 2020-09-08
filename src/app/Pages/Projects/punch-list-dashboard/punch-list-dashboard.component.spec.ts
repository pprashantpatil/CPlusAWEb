import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchListDashboardComponent } from './punch-list-dashboard.component';

describe('PunchListDashboardComponent', () => {
  let component: PunchListDashboardComponent;
  let fixture: ComponentFixture<PunchListDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchListDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
