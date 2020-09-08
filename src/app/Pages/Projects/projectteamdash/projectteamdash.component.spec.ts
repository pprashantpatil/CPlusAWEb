import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectteamdashComponent } from './projectteamdash.component';

describe('ProjectteamdashComponent', () => {
  let component: ProjectteamdashComponent;
  let fixture: ComponentFixture<ProjectteamdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectteamdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectteamdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
