import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenentpartyhalldashboardComponent } from './tenentpartyhalldashboard.component';

describe('TenentpartyhalldashboardComponent', () => {
  let component: TenentpartyhalldashboardComponent;
  let fixture: ComponentFixture<TenentpartyhalldashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenentpartyhalldashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenentpartyhalldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
