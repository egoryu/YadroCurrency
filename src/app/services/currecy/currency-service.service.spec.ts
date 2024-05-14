import {TestBed} from '@angular/core/testing';

import {CurrencyService} from './currency-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpErrorResponse} from "@angular/common/http";

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return rates', () => {
    const mockRates = {
      'RUBUSD': 0.013,
      'RUBEUR': 0.011,
      'RUBGBP': 0.009,
      'RUBCNY': 0.10,
      'RUBJPY': 1.45,
      'RUBTRY': 0.08
    };

    service.getRates().subscribe(rates => {
      expect(rates).toEqual(mockRates);
    });

    const req = httpMock.expectOne('https://api.apilayer.com/currency_data/live?source=RUB&currencies=USD,EUR,GBP,CNY,JPY,TRY');

    expect(req.request.method).toBe('GET');
    req.flush({ quotes: mockRates });
  });

  it('should handle error', () => {
    service.getRates().subscribe({
        next: () => fail('should have failed with 429 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).withContext('status').toEqual(429);
          expect(error.error).withContext('message').toEqual('You have exceeded your daily\\/monthly API rate limit. Please review and upgrade your subscription plan at https:\\/\\/apilayer.com\\/subscriptions to continue.');
        }
      }
    );

    const req = httpMock.expectOne('https://api.apilayer.com/currency_data/live?source=RUB&currencies=USD,EUR,GBP,CNY,JPY,TRY');
    req.flush('You have exceeded your daily\\/monthly API rate limit. Please review and upgrade your subscription plan at https:\\/\\/apilayer.com\\/subscriptions to continue.', { status: 429, statusText: 'Not Found' });
  });
});
