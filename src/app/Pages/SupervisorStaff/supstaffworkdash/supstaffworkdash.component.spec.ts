import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupstaffworkdashComponent } from './supstaffworkdash.component';

describe('SupstaffworkdashComponent', () => {
  let component: SupstaffworkdashComponent;
  let fixture: ComponentFixture<SupstaffworkdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupstaffworkdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupstaffworkdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
