import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyChecklistsComponent } from './safety-checklists.component';

describe('SafetyChecklistsComponent', () => {
  let component: SafetyChecklistsComponent;
  let fixture: ComponentFixture<SafetyChecklistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyChecklistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
