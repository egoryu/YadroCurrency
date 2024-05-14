import {CurrencyEffects} from "./currency.effect";
import {Observable, of, throwError} from "rxjs";
import {CurrencyService} from "../../services/currecy/currency-service.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {Actions} from "@ngrx/effects";
import {loadCurrenciesFailed, loadCurrenciesRequested, loadCurrenciesSucceeded} from "../actions/currency.action";
import { cold, hot } from 'jasmine-marbles';
import {HttpErrorResponse} from "@angular/common/http";

describe('CurrencyEffects', () => {
  let effects: CurrencyEffects;
  let actions$: Observable<Actions>;
  let currencyService: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CurrencyEffects,
        provideMockActions(() => actions$),
        CurrencyService
      ]
    });

    effects = TestBed.inject(CurrencyEffects);
    currencyService = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
    actions$ = TestBed.inject(Actions);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle loadCurrenciesRequested', () => {
    const mockRates = {
      'RUBUSD': 0.013,
      'RUBEUR': 0.011,
      'RUBGBP': 0.009,
      'RUBCNY': 0.10,
      'RUBJPY': 1.45,
      'RUBTRY': 0.08
    };

    spyOn(currencyService, 'getRates').and.returnValue(of(mockRates));

    actions$ = hot('-a', { a: loadCurrenciesRequested() });
    const expected = cold('-b', { b: loadCurrenciesSucceeded({ quotes: mockRates }) });

    expect(effects.loadCurrencies$).toBeObservable(expected);
  });

  it('should handle loadCurrenciesFailed', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Network error',
      status: 500,
      statusText: 'Internal Server Error'
    });

    spyOn(currencyService, 'getRates').and.returnValue(throwError(() => errorResponse));

    actions$ = hot('-a', { a: loadCurrenciesRequested() });
    const expected = cold('-b', { b: loadCurrenciesFailed({ error: errorResponse }) });

    expect(effects.loadCurrencies$).toBeObservable(expected);
  });
});
