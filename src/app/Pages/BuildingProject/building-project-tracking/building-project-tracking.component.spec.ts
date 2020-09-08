import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingProjectTrackingComponent } from './building-project-tracking.component';

describe('BuildingProjectTrackingComponent', () => {
  let component: BuildingProjectTrackingComponent;
  let fixture: ComponentFixture<BuildingProjectTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingProjectTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingProjectTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
