import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingplanimagesComponent } from './buildingplanimages.component';

describe('BuildingplanimagesComponent', () => {
  let component: BuildingplanimagesComponent;
  let fixture: ComponentFixture<BuildingplanimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingplanimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingplanimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
