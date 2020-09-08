import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBuildingDetailsComponent } from './update-building-details.component';

describe('UpdateBuildingDetailsComponent', () => {
  let component: UpdateBuildingDetailsComponent;
  let fixture: ComponentFixture<UpdateBuildingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBuildingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBuildingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
