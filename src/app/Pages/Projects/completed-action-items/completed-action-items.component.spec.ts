import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedActionItemsComponent } from './completed-action-items.component';

describe('CompletedActionItemsComponent', () => {
  let component: CompletedActionItemsComponent;
  let fixture: ComponentFixture<CompletedActionItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedActionItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedActionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
