import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupstaffleaveComponent } from './supstaffleave.component';

describe('SupstaffleaveComponent', () => {
  let component: SupstaffleaveComponent;
  let fixture: ComponentFixture<SupstaffleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupstaffleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupstaffleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
