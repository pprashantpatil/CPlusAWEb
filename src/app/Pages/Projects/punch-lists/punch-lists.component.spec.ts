import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchListsComponent } from './punch-lists.component';

describe('PunchListsComponent', () => {
  let component: PunchListsComponent;
  let fixture: ComponentFixture<PunchListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
