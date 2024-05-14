import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {CurrencyService} from "../../services/currecy/currency-service.service";
import {loadCurrenciesFailed, loadCurrenciesRequested, loadCurrenciesSucceeded} from "../actions/currency.action";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class CurrencyEffects {
  loadCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrenciesRequested),
      switchMap(() =>
        this.currencyService.getRates().pipe(
          map(quotes => loadCurrenciesSucceeded({ quotes })),
          catchError((error: HttpErrorResponse) => of(loadCurrenciesFailed({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService
  ) {}
}
