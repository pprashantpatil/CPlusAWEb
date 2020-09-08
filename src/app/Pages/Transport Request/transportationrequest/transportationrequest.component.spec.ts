import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationrequestComponent } from './transportationrequest.component';

describe('TransportationrequestComponent', () => {
  let component: TransportationrequestComponent;
  let fixture: ComponentFixture<TransportationrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
