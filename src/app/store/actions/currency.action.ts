import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from "@angular/common/http";
export const updateCurrencySelected = createAction(
  '[Currency] Update Currency Selected',
  props<{ symbol: string; selected: boolean }>()
);
export const loadCurrenciesRequested = createAction('[Currency] Load Currencies Requested');
export const loadCurrenciesSucceeded = createAction('[Currency] Load Currencies Succeeded', props<{ quotes: Record<string, number> }>());
export const loadCurrenciesFailed = createAction('[Currency] Load Currencies Failed', props<{ error: HttpErrorResponse }>());
