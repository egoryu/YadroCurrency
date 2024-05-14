import { Pipe, PipeTransform } from '@angular/core';
import {Currency} from "../../../models/currency.model";

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: Currency): string {
    let output = `${value.symbol} ${value.rate.toFixed(2)} `;
    if (value.change > 0) {
      output += `^(+${value.change.toFixed(2)})`;
    } else if (value.change < 0) {
      output += `<(${value.change.toFixed(2)})`;
    } else {
      output += `(0.00)`;
    }
    return output;
  }

}
