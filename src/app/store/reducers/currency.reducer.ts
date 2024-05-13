import {Currency} from "../../models/currency.model";
import {createReducer, on} from '@ngrx/store';
import {
  loadCurrencies,
  loadCurrenciesSucceeded,
  updateCurrencies,
  updateCurrencySelected
} from "../actions/currency.action";
import {state} from "@angular/animations";

export const initialState: Currency[] = [
  {
    symbol: "RUB",
    rate: 60,
    change: 1,
    selected: true,
  },
  {
    symbol: "EUR",
    rate: 70,
    change: 0.001,
    selected: false,
  },
  {
    symbol: "USD",
    rate: 190,
    change: -0.001,
    selected: true,
  },
  {
    symbol: "EUR2",
    rate: 702,
    change: -0.1,
    selected: false,
  },
];

export const currencyReducer = createReducer(
  initialState,
  on(loadCurrencies, state => state),
  on(updateCurrencies, (state, { currencies }) => currencies),
  on(updateCurrencySelected, (state, { symbol, selected }) => {
    return state.map(currency =>
      currency.symbol === symbol? {...currency, selected } : currency
    );
  }),
    on(loadCurrenciesSucceeded, (state, { quotes }) => {
      const newCurrencies = Object.entries(quotes).map(([symbol, rate]) => ({
        symbol,
        rate,
        change: 0, // Изначально устанавливаем change в 0, затем можно будет его рассчитать
        selected: false
      }));

      return {...state, currencies: newCurrencies };
    })
);
