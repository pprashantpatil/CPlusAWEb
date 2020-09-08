import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalProjectTimelineDasboardComponent } from './architectural-project-timeline-dasboard.component';

describe('ArchitecturalProjectTimelineDasboardComponent', () => {
  let component: ArchitecturalProjectTimelineDasboardComponent;
  let fixture: ComponentFixture<ArchitecturalProjectTimelineDasboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitecturalProjectTimelineDasboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecturalProjectTimelineDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
