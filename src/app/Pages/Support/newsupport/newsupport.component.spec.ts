import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsupportComponent } from './newsupport.component';

describe('NewsupportComponent', () => {
  let component: NewsupportComponent;
  let fixture: ComponentFixture<NewsupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
