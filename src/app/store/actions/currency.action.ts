import {createAction, props} from '@ngrx/store';
import {Currency} from "../../models/currency.model";

export const loadCurrencies = createAction('[Currency] Load Currencies');
export const updateCurrencies = createAction('[Currency] Update Currencies', props<{ currencies: Currency[] }>());
export const updateCurrencySelected = createAction(
  '[Currency] Update Currency Selected',
  props<{ symbol: string; selected: boolean }>()
);


export const loadCurrenciesRequested = createAction('[Currency] Load Currencies Requested');
export const loadCurrenciesSucceeded = createAction('[Currency] Load Currencies Succeeded', props<{ quotes: { [key: string]: number } }>());
export const loadCurrenciesFailed = createAction('[Currency] Load Currencies Failed', props<{ error: any }>());
