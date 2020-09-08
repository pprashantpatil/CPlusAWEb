import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffleavesComponent } from './staffleaves.component';

describe('StaffleavesComponent', () => {
  let component: StaffleavesComponent;
  let fixture: ComponentFixture<StaffleavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffleavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
