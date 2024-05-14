import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {ApiResponse} from "../../models/currency.model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.apilayer.com/currency_data/live?source=RUB&currencies=USD,EUR,GBP,CNY,JPY,TRY';
  private apiKey = 'FF0iNteSMI4XOxiVl3CRDscZHAGIlvVO';

  constructor(private http: HttpClient) {}

  getRates(): Observable<{ [key: string]: number }> {
    /*return this.http.get<ApiResponse>(this.apiUrl, { headers: { 'apikey': this.apiKey } })
      .pipe(
        tap(value => console.log(value)),
        map(response => response.quotes));*/
    return of({
      "quotes": {
        "RUBCNY": 0.078935,
        "RUBEUR": 0.010114,
        "RUBGBP": 0.00869,
        "RUBJPY": 1.704903,
        "RUBTRY": 0.351423,
        "RUBUSD": 0.010913
      },
      "source": "RUB",
      "success": true,
      "timestamp": 1715623265
    }).pipe(
      map(response => response.quotes),
      tap(value => console.log("kek1")),
      tap(value => console.log(value)),);
  }
}

/*
* {
  "quotes": {
    "RUBCNY": 0.078935,
    "RUBEUR": 0.010114,
    "RUBGBP": 0.00869,
    "RUBJPY": 1.704903,
    "RUBTRY": 0.351423,
    "RUBUSD": 0.010913
  },
  "source": "RUB",
  "success": true,
  "timestamp": 1715623265
}
*
* {
    "success": true,
    "timestamp": 1715623324,
    "source": "RUB",
    "quotes": {
        "RUBUSD": 0.010913,
        "RUBEUR": 0.010115,
        "RUBGBP": 0.008692,
        "RUBCNY": 0.078935,
        "RUBJPY": 1.705088,
        "RUBTRY": 0.351431
    }
}*/
