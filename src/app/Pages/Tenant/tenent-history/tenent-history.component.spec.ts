import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenentHistoryComponent } from './tenent-history.component';

describe('TenentHistoryComponent', () => {
  let component: TenentHistoryComponent;
  let fixture: ComponentFixture<TenentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
