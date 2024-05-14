import {Currency} from "../../models/currency.model";
import {createReducer, on} from '@ngrx/store';
import {
  loadCurrenciesFailed,
  loadCurrenciesSucceeded,
  updateCurrencySelected
} from "../actions/currency.action";

export const initialState: Currency[] = [
  {
    symbol: "USD",
    rate: 92,
    change: -0.001,
    selected: true,
  },
  {
    symbol: "EUR",
    rate: 98.0,
    change: 0.001,
    selected: true,
  },
  {
    symbol: "GBP",
    rate: 115,
    change: -0.1,
    selected: true,
  },
  {
    symbol: "JPY",
    rate: 0.59,
    change: -0.1,
    selected: false,
  },
  {
    symbol: "CNY",
    rate: 12,
    change: 0.1,
    selected: false,
  },
  {
    symbol: "TRY",
    rate: 2,
    change: 0.0,
    selected: false,
  },
];

export const currencyReducer = createReducer(
  initialState,
  on(updateCurrencySelected, (state, { symbol, selected }) => {
    return state.map(currency =>
      currency.symbol === symbol ? {...currency, selected } : currency
    );
  }),
  on(loadCurrenciesSucceeded, (state, { quotes }) => {
    const newCurrencies: Currency[] = Object.entries(quotes).map(([symbol, rate]) => {
      const currentCurrency = state.find(currency => currency.symbol === symbol.slice(3));
      const change = currentCurrency ? 1 / rate - currentCurrency.rate : 0.0;
      const selected = currentCurrency ? currentCurrency.selected : false;

      return {
        symbol: symbol.slice(3),
        rate: 1 / rate,
        change,
        selected
      }
    });
    return newCurrencies;
  }),
  on(loadCurrenciesFailed, (state, {error}) => {
    console.log(error.message);

    if (error.status !== 429) {
      return state;
    }
    return [
      {
        symbol: "EUR",
        rate: 98.0,
        change: Math.random() * 2 - 1,
        selected: true,
      },
      {
        symbol: "USD",
        rate: 92,
        change: Math.random() * 2 - 1,
        selected: true,
      },
      {
        symbol: "GBP",
        rate: 115,
        change: Math.random() * 2 - 1,
        selected: true,
      },
      {
        symbol: "JPY",
        rate: 0.59,
        change: Math.random() * 2 - 1,
        selected: true,
      },
      {
        symbol: "CNY",
        rate: 12,
        change: Math.random() * 2 - 1,
        selected: true,
      },
      {
        symbol: "TRY",
        rate: 2,
        change: 0.0,
        selected: true,
      },
    ];
  }),
);
