import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyAddComponent} from "./currency-add.component";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [CurrencyAddComponent],
  exports: [
    CurrencyAddComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ButtonModule
  ]
})
export class CurrencyAddModule { }
