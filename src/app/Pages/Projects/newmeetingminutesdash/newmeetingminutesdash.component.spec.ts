import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmeetingminutesdashComponent } from './newmeetingminutesdash.component';

describe('NewmeetingminutesdashComponent', () => {
  let component: NewmeetingminutesdashComponent;
  let fixture: ComponentFixture<NewmeetingminutesdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmeetingminutesdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmeetingminutesdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
