import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenentNoticeComponent } from './tenent-notice.component';

describe('TenentNoticeComponent', () => {
  let component: TenentNoticeComponent;
  let fixture: ComponentFixture<TenentNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenentNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenentNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
