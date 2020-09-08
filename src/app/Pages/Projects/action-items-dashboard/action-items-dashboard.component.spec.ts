import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionItemsDashboardComponent } from './action-items-dashboard.component';

describe('ActionItemsDashboardComponent', () => {
  let component: ActionItemsDashboardComponent;
  let fixture: ComponentFixture<ActionItemsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionItemsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
