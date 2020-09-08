import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCommunityEvntDashboardComponent } from './book-community-evnt-dashboard.component';

describe('BookCommunityEvntDashboardComponent', () => {
  let component: BookCommunityEvntDashboardComponent;
  let fixture: ComponentFixture<BookCommunityEvntDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCommunityEvntDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCommunityEvntDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
