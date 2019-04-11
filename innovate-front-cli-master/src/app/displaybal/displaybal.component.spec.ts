import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaybalComponent } from './displaybal.component';

describe('DisplaybalComponent', () => {
  let component: DisplaybalComponent;
  let fixture: ComponentFixture<DisplaybalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaybalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaybalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
