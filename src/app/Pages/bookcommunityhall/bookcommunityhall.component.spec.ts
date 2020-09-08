import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcommunityhallComponent } from './bookcommunityhall.component';

describe('BookcommunityhallComponent', () => {
  let component: BookcommunityhallComponent;
  let fixture: ComponentFixture<BookcommunityhallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcommunityhallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcommunityhallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
