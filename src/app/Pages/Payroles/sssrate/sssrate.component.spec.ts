import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SSSRateComponent } from './sssrate.component';

describe('SSSRateComponent', () => {
  let component: SSSRateComponent;
  let fixture: ComponentFixture<SSSRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SSSRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SSSRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
