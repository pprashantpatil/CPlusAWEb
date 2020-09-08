import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcommunityeventComponent } from './addnewcommunityevent.component';

describe('AddnewcommunityeventComponent', () => {
  let component: AddnewcommunityeventComponent;
  let fixture: ComponentFixture<AddnewcommunityeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcommunityeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcommunityeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
