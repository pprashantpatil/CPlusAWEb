import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedsupportDashComponent } from './closedsupport-dash.component';

describe('ClosedsupportDashComponent', () => {
  let component: ClosedsupportDashComponent;
  let fixture: ComponentFixture<ClosedsupportDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedsupportDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedsupportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
