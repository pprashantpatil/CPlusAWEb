import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineplanimagesComponent } from './timelineplanimages.component';

describe('TimelineplanimagesComponent', () => {
  let component: TimelineplanimagesComponent;
  let fixture: ComponentFixture<TimelineplanimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineplanimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineplanimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
