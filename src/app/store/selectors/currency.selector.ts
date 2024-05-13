
import { createSelector } from '@ngrx/store';
import {Currency} from "../../models/currency.model";
import {AppState} from "../state/app.state";

export const selectCurrencies = createSelector(
  (state: AppState) => state.currencies,
  (currencies: Currency[]) => currencies
);
