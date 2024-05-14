import { Pipe, PipeTransform } from '@angular/core';
import {Currency} from "../../../models/currency.model";

@Pipe({
  name: 'currency',
  pure: false
})
export class CurrencyPipe implements PipeTransform {

  transform(value: Currency): string {
    let output = `${value.symbol.padEnd(5, `⠀`)} ${value.rate.toFixed(2).padEnd(15, `⠀`)}`;
    if (value.change > 0) {
      output += `▲(+${value.change.toFixed(2)})`;
    } else if (value.change < 0) {
      output += `▼(${value.change.toFixed(2)})`;
    } else {
      output += `(0.00)`.padStart(7, '⠀');
    }
    return output;
  }

}
