import {currencyReducer, initialState} from "./currency.reducer";
import {loadCurrenciesFailed, loadCurrenciesSucceeded, updateCurrencySelected} from "../actions/currency.action";
import {HttpErrorResponse} from "@angular/common/http";

describe('Currency Reducer', () => {
  it('should update currency selected state', () => {
    const updatedState = currencyReducer(initialState, updateCurrencySelected({ symbol: 'EUR', selected: false }));
    expect(updatedState.find(currency => currency.symbol === 'EUR')?.selected).toBe(false);
  });

  it('should handle loadCurrenciesSucceeded', () => {
    const quotes = {
      'RUBUSD': 0.013,
      'RUBEUR': 0.011,
      'RUBGBP': 0.009,
      'RUBCNY': 0.10,
      'RUBJPY': 1.45,
      'RUBTRY': 0.08
    };

    const updatedState = currencyReducer(initialState, loadCurrenciesSucceeded({ quotes }));
    expect(updatedState[0].rate).toBe(1 / quotes['RUBUSD']);
    expect(updatedState[0].change).toBe(1 / quotes['RUBUSD'] - initialState[0].rate);
  });

  it('should handle loadCurrenciesFailed with status 429', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Limit Request Error',
      status: 429,
      statusText: 'Too Many Requests',
    });
    const updatedState = currencyReducer(initialState, loadCurrenciesFailed({ error: errorResponse }));
    expect(updatedState[0].change).not.toEqual(initialState[0].change);
  });

  it('should handle loadCurrenciesFailed with status not 429', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Network error',
      status: 500,
      statusText: 'Internal Server Error',
    });
    const updatedState = currencyReducer(initialState, loadCurrenciesFailed({ error: errorResponse }));
    expect(updatedState).toEqual(initialState);
  });
});
