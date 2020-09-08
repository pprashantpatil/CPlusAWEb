import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityhallComponent } from './communityhall.component';

describe('CommunityhallComponent', () => {
  let component: CommunityhallComponent;
  let fixture: ComponentFixture<CommunityhallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityhallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityhallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
