import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetsComponent } from './update-assets.component';

describe('UpdateAssetsComponent', () => {
  let component: UpdateAssetsComponent;
  let fixture: ComponentFixture<UpdateAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
