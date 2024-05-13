import {Currency} from "../../models/currency.model";

export interface AppState {
  readonly currencies: Currency[];
}
