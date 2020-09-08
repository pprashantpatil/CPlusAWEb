import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppoapprovalComponent } from './suppoapproval.component';

describe('SuppoapprovalComponent', () => {
  let component: SuppoapprovalComponent;
  let fixture: ComponentFixture<SuppoapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppoapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppoapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
