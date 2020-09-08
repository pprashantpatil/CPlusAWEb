import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodashboardComponent } from './podashboard.component';

describe('PodashboardComponent', () => {
  let component: PodashboardComponent;
  let fixture: ComponentFixture<PodashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
