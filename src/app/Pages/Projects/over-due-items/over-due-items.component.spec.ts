import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverDueItemsComponent } from './over-due-items.component';

describe('OverDueItemsComponent', () => {
  let component: OverDueItemsComponent;
  let fixture: ComponentFixture<OverDueItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverDueItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverDueItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
