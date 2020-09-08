import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyListViewsComponent } from './occupancy-list-views.component';

describe('OccupancyListViewsComponent', () => {
  let component: OccupancyListViewsComponent;
  let fixture: ComponentFixture<OccupancyListViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyListViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyListViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
