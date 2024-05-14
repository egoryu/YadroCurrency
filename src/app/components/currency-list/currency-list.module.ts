import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrencyListComponent} from "./currency-list.component";
import {CurrencyPipe} from "./pipes/currency.pipe";


@NgModule({
  declarations: [CurrencyListComponent, CurrencyPipe],
  exports: [
    CurrencyListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CurrencyListModule { }
