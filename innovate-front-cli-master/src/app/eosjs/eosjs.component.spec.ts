import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EosjsComponent } from './eosjs.component';

describe('EosjsComponent', () => {
  let component: EosjsComponent;
  let fixture: ComponentFixture<EosjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EosjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EosjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
