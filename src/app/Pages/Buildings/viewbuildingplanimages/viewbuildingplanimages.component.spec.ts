import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbuildingplanimagesComponent } from './viewbuildingplanimages.component';

describe('ViewbuildingplanimagesComponent', () => {
  let component: ViewbuildingplanimagesComponent;
  let fixture: ComponentFixture<ViewbuildingplanimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbuildingplanimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbuildingplanimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
