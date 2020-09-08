import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryRequestComponent } from './grocery-request.component';

describe('GroceryRequestComponent', () => {
  let component: GroceryRequestComponent;
  let fixture: ComponentFixture<GroceryRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
