import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmittalsDashboardComponent } from './transmittals-dashboard.component';

describe('TransmittalsDashboardComponent', () => {
  let component: TransmittalsDashboardComponent;
  let fixture: ComponentFixture<TransmittalsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmittalsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmittalsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
