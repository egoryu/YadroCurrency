import { CurrencyPipe } from './currency.pipe';
import {Currency} from "../../../models/currency.model";

describe('CurrencyPipe', () => {
  let pipe: CurrencyPipe;

  beforeEach(() => {
    pipe = new CurrencyPipe();
  });

  it('should format currency with positive change', () => {
    const currency: Currency = {
      symbol: 'USD',
      rate: 1.23,
      change: 0.05,
      selected: true
    };
    expect(pipe.transform(currency)).toEqual('USD⠀⠀ 1.23⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀▲(+0.05)');
  });

  it('should format currency with negative change', () => {
    const currency: Currency = {
      symbol: 'EUR',
      rate: 0.89,
      change: -0.02,
      selected: true
    };
    expect(pipe.transform(currency)).toEqual('EUR⠀⠀ 0.89⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀▼(-0.02)');
  });

  it('should format currency with no change', () => {
    const currency: Currency = {
      symbol: 'GBP',
      rate: 1.45,
      change: 0,
      selected: true
    };
    expect(pipe.transform(currency)).toEqual('GBP⠀⠀ 1.45⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀(0.00)');
  });

  it('should format currency with big rate', () => {
    const currency: Currency = {
      symbol: 'JPY',
      rate: 1200.502,
      change: 0.1033,
      selected: false
    };
    expect(pipe.transform(currency)).toEqual('JPY⠀⠀ 1200.50⠀⠀⠀⠀⠀⠀⠀⠀▲(+0.10)');
  });
});
