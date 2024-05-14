import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ApiResponse} from "../../models/currency.model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.apilayer.com/currency_data/live?source=RUB&currencies=USD,EUR,GBP,CNY,JPY,TRY';
  private apiKey = 'UJ56txA8hfbA8VEkVttACVr7vBsKlIS8';

  constructor(private http: HttpClient) {}

  getRates(): Observable<{ [key: string]: number }> {
    return this.http.get<ApiResponse>(this.apiUrl, { headers: { 'apikey': this.apiKey } })
      .pipe(
        map(response => response?.quotes));
  }
}
