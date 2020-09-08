import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalStagesDashComponent } from './architectural-stages-dash.component';

describe('ArchitecturalStagesDashComponent', () => {
  let component: ArchitecturalStagesDashComponent;
  let fixture: ComponentFixture<ArchitecturalStagesDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitecturalStagesDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecturalStagesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
