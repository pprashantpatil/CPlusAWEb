import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillHealthComponent } from './fill-health.component';

describe('FillHealthComponent', () => {
  let component: FillHealthComponent;
  let fixture: ComponentFixture<FillHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
