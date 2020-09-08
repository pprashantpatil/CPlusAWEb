import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingStagesComponent } from './building-stages.component';

describe('BuildingStagesComponent', () => {
  let component: BuildingStagesComponent;
  let fixture: ComponentFixture<BuildingStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
