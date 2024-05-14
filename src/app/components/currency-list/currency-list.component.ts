import {Store} from '@ngrx/store';
import {map, Observable, tap} from 'rxjs';
import {AppState} from "../../store/state/app.state";
import {Currency} from "../../models/currency.model";
import {Component, OnInit} from '@angular/core';
import {selectCurrencies} from "../../store/selectors/currency.selector";
import {loadCurrenciesRequested} from "../../store/actions/currency.action";


@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  currencies$: Observable<Currency[]>;

  constructor(private store: Store<AppState>) {
    console.log("kek");
    this.currencies$ = this.store.select(selectCurrencies).pipe(
      tap(value => console.log(value)),
      map(currencies => currencies.filter(currency => currency.selected))
    );
  }

  ngOnInit() {
    this.store.dispatch(loadCurrenciesRequested());
  }
}
