import { Component, OnInit } from '@angular/core';
import {News} from "../../../model/news";
import {NewsService} from "../../../service/news.service";
import {Stock} from "../../../model/stock";
import {StockService} from "../../../service/stock.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public topNews : News[];

  public activeStocks: string = 'US';
  public usStocks: Stock[] = [];
  public euStocks: Stock[] = [];
  public asiaStocks: Stock[] = [];

  constructor(private newsService: NewsService, private stockService: StockService) { }

  ngOnInit(): void {
    this.findStockBySymbol('AAPL', this.usStocks);
    this.findStockBySymbol('TWTR', this.usStocks);
    this.findStockBySymbol('AMZN', this.usStocks);
    this.findStockBySymbol('NFLX', this.usStocks);
    this.findStockBySymbol('GOOG', this.usStocks);

    this.findStockBySymbol('RHHBY', this.euStocks);
    this.findStockBySymbol('NTES', this.euStocks);
    this.findStockBySymbol('NVO', this.euStocks);
    this.findStockBySymbol('ASML', this.euStocks);
    this.findStockBySymbol('NSRGY', this.euStocks);

    this.findStockBySymbol('BIDU', this.asiaStocks);
    this.findStockBySymbol('NIO', this.asiaStocks);
    this.findStockBySymbol('BILI', this.asiaStocks);
    this.findStockBySymbol('PDD', this.asiaStocks);
    this.findStockBySymbol('VIPS', this.asiaStocks);

    this.newsService.findTopNews().subscribe({
      next: c => {
        this.topNews = c;
      },
      error: error => {
        alert("Unable to connect to server")
      }
    });
  }

  public changeActive(active: string) {
    this.activeStocks = active;
  }

  findStockBySymbol(symbol: String, stocks: Stock[]) {
    this.stockService.getStock(symbol).subscribe({
      next: resp => {
        stocks.push(resp.stock);
      },
      error: error => {
        alert(JSON.stringify(error.json()));
      }
    });
  }
}
