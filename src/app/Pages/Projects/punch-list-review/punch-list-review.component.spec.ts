import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchListReviewComponent } from './punch-list-review.component';

describe('PunchListReviewComponent', () => {
  let component: PunchListReviewComponent;
  let fixture: ComponentFixture<PunchListReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchListReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchListReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
