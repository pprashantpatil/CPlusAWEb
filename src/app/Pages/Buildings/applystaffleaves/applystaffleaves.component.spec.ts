import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplystaffleavesComponent } from './applystaffleaves.component';

describe('ApplystaffleavesComponent', () => {
  let component: ApplystaffleavesComponent;
  let fixture: ComponentFixture<ApplystaffleavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplystaffleavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplystaffleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
