import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFillHealthComponent } from './new-fill-health.component';

describe('NewFillHealthComponent', () => {
  let component: NewFillHealthComponent;
  let fixture: ComponentFixture<NewFillHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFillHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFillHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
