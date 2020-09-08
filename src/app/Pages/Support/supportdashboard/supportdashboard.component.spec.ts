import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportdashboardComponent } from './supportdashboard.component';

describe('SupportdashboardComponent', () => {
  let component: SupportdashboardComponent;
  let fixture: ComponentFixture<SupportdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
