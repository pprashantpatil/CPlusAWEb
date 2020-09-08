import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesLibraryComponent } from './resources-library.component';

describe('ResourcesLibraryComponent', () => {
  let component: ResourcesLibraryComponent;
  let fixture: ComponentFixture<ResourcesLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
