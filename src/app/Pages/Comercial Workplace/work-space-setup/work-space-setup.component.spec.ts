import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceSetupComponent } from './work-space-setup.component';

describe('WorkSpaceSetupComponent', () => {
  let component: WorkSpaceSetupComponent;
  let fixture: ComponentFixture<WorkSpaceSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpaceSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
