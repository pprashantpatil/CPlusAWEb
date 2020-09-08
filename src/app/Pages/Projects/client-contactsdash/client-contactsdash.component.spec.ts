import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactsdashComponent } from './client-contactsdash.component';

describe('ClientContactsdashComponent', () => {
  let component: ClientContactsdashComponent;
  let fixture: ComponentFixture<ClientContactsdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientContactsdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContactsdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
