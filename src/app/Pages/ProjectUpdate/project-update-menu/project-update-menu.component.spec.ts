import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdateMenuComponent } from './project-update-menu.component';

describe('ProjectUpdateMenuComponent', () => {
  let component: ProjectUpdateMenuComponent;
  let fixture: ComponentFixture<ProjectUpdateMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUpdateMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUpdateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
