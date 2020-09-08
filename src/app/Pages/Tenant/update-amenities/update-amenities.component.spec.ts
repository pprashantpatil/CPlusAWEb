import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAmenitiesComponent } from './update-amenities.component';

describe('UpdateAmenitiesComponent', () => {
  let component: UpdateAmenitiesComponent;
  let fixture: ComponentFixture<UpdateAmenitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAmenitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
