import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedByComponent } from './raised-by.component';

describe('RaisedByComponent', () => {
  let component: RaisedByComponent;
  let fixture: ComponentFixture<RaisedByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
