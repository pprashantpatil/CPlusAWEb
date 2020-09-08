import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalProjectTimelineComponent } from './architectural-project-timeline.component';

describe('ArchitecturalProjectTimelineComponent', () => {
  let component: ArchitecturalProjectTimelineComponent;
  let fixture: ComponentFixture<ArchitecturalProjectTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitecturalProjectTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecturalProjectTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
