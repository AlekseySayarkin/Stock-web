import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Stock} from "../../../model/stock";
import {ActivatedRoute} from "@angular/router";
import {StockService} from "../../../service/stock.service";
import {AuthService} from "../../../service/auth/auth.service";
import {NewsService} from "../../../service/news.service";
import {News} from "../../../model/news";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {
  public stockNews : News[];
  public data: any[];
  public prediction: any[];
  stock: Stock;

  constructor(private stockService: StockService, private rout: ActivatedRoute,
              public authService: AuthService, newsService: NewsService) {
    this.rout.params.subscribe(params => {
      this.findStockBySymbol(params['symbol']);
      stockService.getStockHistory(params['symbol']).subscribe({
        next: data => {
          this.data = [data.length];
          for (let i = 0; i < data.length; i++) {
            this.data[i] = {
              "Date": new Date(data[i].date),
              "Open": data[i].open,
              "High": data[i].high,
              "Low": data[i].low,
              "Close": data[i].close,
              "Adj Close": data[i].close,
              "Volume": data[i].volume,
            };
          }
          this.data.reverse();
          this.prediction = [];
          this.data.forEach(d => this.prediction.push(d))

          let i = this.prediction.length - 1
          let size = i + 180
          for (; i < size; i++) {
            let date = new Date(this.prediction[i].Date);
            date.setDate(date.getDate() + 1)
            let open = this.getRandomArbitrary(this.prediction[i].Open - this.per(this.prediction[i].Open, 3), this.prediction[i].Open + this.per(this.prediction[i].Open, 3));

            let close = this.getRandomArbitrary(open - this.per(open, 3), open + this.per(open, 3));
            this.prediction.push({
              "Date": date,
              "Open": open,
              "High": open,
              "Low": close,
              "Close": close,
              "Adj Close": close,
              "Volume": this.getRandomArbitrary(this.prediction[i].Volume - this.per(this.prediction[i].Volume, 1), this.prediction[i].Volume + this.per(this.prediction[i].Volume, 1)),
            })
          }
        }
      });
      newsService.findNews(params['symbol'], 5).subscribe({
        next: c => {
          this.stockNews = c;
        }
      })
    })
  }

  per(num: number, amount: number){
    return num*amount/100;
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  ngOnInit(): void {
  }

  subscribe(symbol: string) {
    this.stockService.subscribe(symbol)
    window.location.reload()
  }

  unsubscribe(symbol: string) {
    this.stockService.unsubscribe(symbol)
    window.location.reload()
  }

  contains(): boolean {
    let stocks = this.authService.currentUser.systemStocks;
    let res = false;
    stocks.forEach(s => {
      if (s.symbol == this.stock.symbol) {
        res = true;
      }
    })
    return res;
  }

  findStockBySymbol(symbol: String) {
    this.stockService.getStock(symbol).subscribe({
      next: resp => {
        this.stock = resp.stock;
      },
      error: error => {
        alert(JSON.stringify(error.json()));
      }
    });  }
}
