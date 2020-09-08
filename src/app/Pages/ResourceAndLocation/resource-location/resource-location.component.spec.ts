import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceLocationComponent } from './resource-location.component';

describe('ResourceLocationComponent', () => {
  let component: ResourceLocationComponent;
  let fixture: ComponentFixture<ResourceLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
