import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadeUserComponent } from './upade-user.component';

describe('UpadeUserComponent', () => {
  let component: UpadeUserComponent;
  let fixture: ComponentFixture<UpadeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpadeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpadeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
