import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingUnitComponent } from './building-unit.component';

describe('BuildingUnitComponent', () => {
  let component: BuildingUnitComponent;
  let fixture: ComponentFixture<BuildingUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
