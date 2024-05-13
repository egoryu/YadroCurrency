import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {CurrencyService} from "../../services/currecy/currency-service.service";
import {loadCurrenciesFailed, loadCurrenciesRequested, loadCurrenciesSucceeded} from "../actions/currency.action";

@Injectable({ providedIn: 'root' })
export class CurrencyEffects {
  loadCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrenciesRequested),
      switchMap(() =>
        this.currencyService.getRates().pipe(
          map(currencies => loadCurrenciesSucceeded({ currencies })),
          catchError(error => of(loadCurrenciesFailed({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService
  ) {}
}
