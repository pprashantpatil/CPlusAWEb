import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPlanupdateComponent } from './building-planupdate.component';

describe('BuildingPlanupdateComponent', () => {
  let component: BuildingPlanupdateComponent;
  let fixture: ComponentFixture<BuildingPlanupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingPlanupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPlanupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
