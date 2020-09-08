import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprojecttrackingComponent } from './newprojecttracking.component';

describe('NewprojecttrackingComponent', () => {
  let component: NewprojecttrackingComponent;
  let fixture: ComponentFixture<NewprojecttrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprojecttrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprojecttrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
