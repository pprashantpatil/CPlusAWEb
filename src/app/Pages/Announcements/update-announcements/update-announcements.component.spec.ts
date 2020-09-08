import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnouncementsComponent } from './update-announcements.component';

describe('UpdateAnnouncementsComponent', () => {
  let component: UpdateAnnouncementsComponent;
  let fixture: ComponentFixture<UpdateAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
