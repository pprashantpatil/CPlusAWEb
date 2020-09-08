import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBuildingStagesComponent } from './new-building-stages.component';

describe('NewBuildingStagesComponent', () => {
  let component: NewBuildingStagesComponent;
  let fixture: ComponentFixture<NewBuildingStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBuildingStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBuildingStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
