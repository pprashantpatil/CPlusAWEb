import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecturalStagesComponent } from './architectural-stages.component';

describe('ArchitecturalStagesComponent', () => {
  let component: ArchitecturalStagesComponent;
  let fixture: ComponentFixture<ArchitecturalStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitecturalStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecturalStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
