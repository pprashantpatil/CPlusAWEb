import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetenentComponent } from './updatetenent.component';

describe('UpdatetenentComponent', () => {
  let component: UpdatetenentComponent;
  let fixture: ComponentFixture<UpdatetenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatetenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
