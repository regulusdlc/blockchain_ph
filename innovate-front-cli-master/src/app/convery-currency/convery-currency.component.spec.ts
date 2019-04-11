import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveryCurrencyComponent } from './convery-currency.component';

describe('ConveryCurrencyComponent', () => {
  let component: ConveryCurrencyComponent;
  let fixture: ComponentFixture<ConveryCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConveryCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveryCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
