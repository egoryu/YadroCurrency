import {Component} from '@angular/core';
import {map, Observable} from "rxjs";
import {Currency} from "../../models/currency.model";
import {Store} from "@ngrx/store";
import {updateCurrencySelected} from "../../store/actions/currency.action";
import {AppState} from "../../store/state/app.state";
import {selectCurrencies} from "../../store/selectors/currency.selector";

@Component({
  selector: 'app-currency-add',
  templateUrl: './currency-add.component.html',
  styleUrl: './currency-add.component.css'
})
export class CurrencyAddComponent {
  currencies$: Observable<{name:string, value:Currency}[]>;
  selectedCurrency: Currency = {change: 0, rate: 0, selected: false, symbol: ""};

  constructor(private store: Store<AppState>) {
    this.currencies$ = this.store.select(selectCurrencies).pipe(
      map(currencies => currencies.filter(currency => !currency.selected)),
      map(currencies => currencies.map(currency => ({ name: currency.symbol, value: currency })))
    );
  }

  addCurrency(currency: Currency): void {
    this.store.dispatch(updateCurrencySelected({symbol: currency.symbol, selected: true}));
  }
}
