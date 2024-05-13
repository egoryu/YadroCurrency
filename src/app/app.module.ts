import {NgModule} from "@angular/core";
import {StoreModule} from '@ngrx/store';
import {currencyReducer} from "./store/reducers/currency.reducer";
import {AppComponent} from "./app.component";
import {BrowserModule} from '@angular/platform-browser';
import {CurrencyListModule} from "./components/currency-list/currency-list.module";
import {CurrencyAddModule} from "./components/currency-add/currency-add.module";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EffectsModule} from "@ngrx/effects";
import {CurrencyEffects} from "./store/effects/currency.effect";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CurrencyListModule,
    CurrencyAddModule,
    BrowserAnimationsModule,
    DropdownModule,
    HttpClientModule,
    StoreModule.forRoot({currencies: currencyReducer}),
    EffectsModule.forRoot([CurrencyEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
