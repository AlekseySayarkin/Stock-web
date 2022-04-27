import { Component, OnInit } from '@angular/core';
import {Stock} from "../../../model/stock";
import {StockService} from "../../../service/stock.service";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: 'app-subscribed',
  templateUrl: './subscribed.component.html',
  styleUrls: ['./subscribed.component.css']
})
export class SubscribedComponent implements OnInit {

  stocks: Stock[] = [];
  constructor(private stockService: StockService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.currentUser != null) {
      this.authService.currentUser.systemStocks.forEach(stock => {
        this.findStockBySymbol(stock.symbol);
      })
    }
  }

  findStockBySymbol(symbol: String) {
    this.stockService.getStock(symbol).subscribe({
      next: resp => {
        this.stocks.push(resp.stock);
      },
      error: error => {
        alert(JSON.stringify(error.json()));
      }
    });
  }
}
