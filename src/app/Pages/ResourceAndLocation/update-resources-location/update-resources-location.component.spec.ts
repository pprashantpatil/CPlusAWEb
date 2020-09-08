import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResourcesLocationComponent } from './update-resources-location.component';

describe('UpdateResourcesLocationComponent', () => {
  let component: UpdateResourcesLocationComponent;
  let fixture: ComponentFixture<UpdateResourcesLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateResourcesLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateResourcesLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
