import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewassetsComponent } from './addnewassets.component';

describe('AddnewassetsComponent', () => {
  let component: AddnewassetsComponent;
  let fixture: ComponentFixture<AddnewassetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewassetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
