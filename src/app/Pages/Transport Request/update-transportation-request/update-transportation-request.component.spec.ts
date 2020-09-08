import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransportationRequestComponent } from './update-transportation-request.component';

describe('UpdateTransportationRequestComponent', () => {
  let component: UpdateTransportationRequestComponent;
  let fixture: ComponentFixture<UpdateTransportationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTransportationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTransportationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
