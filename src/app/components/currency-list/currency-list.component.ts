import {Store} from '@ngrx/store';
import {map, Observable, of} from 'rxjs';
import {AppState} from "../../store/state/app.state";
import {Currency} from "../../models/currency.model";
import {Component, OnDestroy} from '@angular/core';
import {selectCurrencies} from "../../store/selectors/currency.selector";


@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnDestroy {
  currencies$: Observable<Currency[]>;
  intervalDataId: number;
  currentTime: string;

  constructor(private store: Store<AppState>) {
    this.currencies$ = this.store.select(selectCurrencies).pipe(
      map(currencies => currencies.filter(currency => currency.selected))
    );

    this.currentTime = new Date().toLocaleString();

    this.intervalDataId = setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalDataId);
  }
}
