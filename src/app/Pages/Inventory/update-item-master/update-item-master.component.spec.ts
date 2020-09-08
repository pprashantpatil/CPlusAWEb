import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemMasterComponent } from './update-item-master.component';

describe('UpdateItemMasterComponent', () => {
  let component: UpdateItemMasterComponent;
  let fixture: ComponentFixture<UpdateItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
