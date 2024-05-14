export interface Currency {
  symbol: string;
  rate: number;
  change: number;
  selected: boolean;
}

export interface ApiResponse {
  quotes: {
    [key: string]: number;
  };
  source: string;
  success: boolean;
  timestamp: number;
}
