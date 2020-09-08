import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoExchangedashComponent } from './info-exchangedash.component';

describe('InfoExchangedashComponent', () => {
  let component: InfoExchangedashComponent;
  let fixture: ComponentFixture<InfoExchangedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoExchangedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoExchangedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
