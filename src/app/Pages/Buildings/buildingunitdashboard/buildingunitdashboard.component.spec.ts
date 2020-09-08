import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingunitdashboardComponent } from './buildingunitdashboard.component';

describe('BuildingunitdashboardComponent', () => {
  let component: BuildingunitdashboardComponent;
  let fixture: ComponentFixture<BuildingunitdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingunitdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingunitdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
