import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenenttransportrequestdashboardComponent } from './tenenttransportrequestdashboard.component';

describe('TenenttransportrequestdashboardComponent', () => {
  let component: TenenttransportrequestdashboardComponent;
  let fixture: ComponentFixture<TenenttransportrequestdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenenttransportrequestdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenenttransportrequestdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
