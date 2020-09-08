import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectfilesComponent } from './projectfiles.component';

describe('ProjectfilesComponent', () => {
  let component: ProjectfilesComponent;
  let fixture: ComponentFixture<ProjectfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
