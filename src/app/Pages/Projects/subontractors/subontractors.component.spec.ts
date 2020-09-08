import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubontractorsComponent } from './subontractors.component';

describe('SubontractorsComponent', () => {
  let component: SubontractorsComponent;
  let fixture: ComponentFixture<SubontractorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubontractorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubontractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
