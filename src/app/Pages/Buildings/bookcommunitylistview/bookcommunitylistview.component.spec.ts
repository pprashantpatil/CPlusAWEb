import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcommunitylistviewComponent } from './bookcommunitylistview.component';

describe('BookcommunitylistviewComponent', () => {
  let component: BookcommunitylistviewComponent;
  let fixture: ComponentFixture<BookcommunitylistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcommunitylistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcommunitylistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
