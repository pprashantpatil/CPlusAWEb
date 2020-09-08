import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSSSRateComponent } from './new-sssrate.component';

describe('NewSSSRateComponent', () => {
  let component: NewSSSRateComponent;
  let fixture: ComponentFixture<NewSSSRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSSSRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSSSRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
