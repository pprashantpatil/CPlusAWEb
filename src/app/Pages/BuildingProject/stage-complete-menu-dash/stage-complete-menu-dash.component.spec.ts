import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageCompleteMenuDashComponent } from './stage-complete-menu-dash.component';

describe('StageCompleteMenuDashComponent', () => {
  let component: StageCompleteMenuDashComponent;
  let fixture: ComponentFixture<StageCompleteMenuDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageCompleteMenuDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageCompleteMenuDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
