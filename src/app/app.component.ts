import {Component, OnDestroy} from '@angular/core';
import {loadCurrenciesRequested} from "./store/actions/currency.action";
import {Store} from "@ngrx/store";
import {AppState} from "./store/state/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'YadroCurrency';
  intervalRequestId: number;

  constructor(private store: Store<AppState>) {
    this.intervalRequestId = setInterval(() => {
      this.store.dispatch(loadCurrenciesRequested());
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalRequestId);
  }
}
