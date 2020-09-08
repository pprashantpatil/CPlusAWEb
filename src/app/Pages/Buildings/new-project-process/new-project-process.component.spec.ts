import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectProcessComponent } from './new-project-process.component';

describe('NewProjectProcessComponent', () => {
  let component: NewProjectProcessComponent;
  let fixture: ComponentFixture<NewProjectProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
