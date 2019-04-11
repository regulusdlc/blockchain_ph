import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCoinComponent } from './transfer-coin.component';

describe('TransferCoinComponent', () => {
  let component: TransferCoinComponent;
  let fixture: ComponentFixture<TransferCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
