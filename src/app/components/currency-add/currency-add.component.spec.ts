import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyAddComponent } from './currency-add.component';

describe('CurrencyAddComponent', () => {
  let component: CurrencyAddComponent;
  let fixture: ComponentFixture<CurrencyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
