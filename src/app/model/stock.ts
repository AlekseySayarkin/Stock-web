export class StockResponse {
  stock: Stock;
}

export class Stock {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  quote: Quote
}

export class Quote {
  open: number;
  previousClose: number
}
