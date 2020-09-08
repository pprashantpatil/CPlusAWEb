import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectfiledashComponent } from './projectfiledash.component';

describe('ProjectfiledashComponent', () => {
  let component: ProjectfiledashComponent;
  let fixture: ComponentFixture<ProjectfiledashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectfiledashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectfiledashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
