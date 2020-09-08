import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttledashboardComponent } from './shuttledashboard.component';

describe('ShuttledashboardComponent', () => {
  let component: ShuttledashboardComponent;
  let fixture: ComponentFixture<ShuttledashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttledashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuttledashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
