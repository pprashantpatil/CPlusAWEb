import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageCompleteMenuComponent } from './stage-complete-menu.component';

describe('StageCompleteMenuComponent', () => {
  let component: StageCompleteMenuComponent;
  let fixture: ComponentFixture<StageCompleteMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageCompleteMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageCompleteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
