import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {StockService} from "../../../service/stock.service";
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {ValidatorUtil} from "../../../service/validator.util";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public errorMessage: string = null

  constructor(private stockService: StockService, private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
  }

  findStock(itemForm: NgForm) {
    let symbol = itemForm.value.symbol;
    this.errorMessage = ValidatorUtil.validateAndReturnErrorMessage(symbol, ValidatorUtil.symbol)
    if (this.errorMessage == null) {
      this.findStockBySymbol(symbol);
    }
  }

  findStockBySymbol(symbol: String) {
    this.stockService.getStock(symbol).subscribe({
      next: () => {
        this.route.navigate(['/stocks/' + symbol]).then();
      },
      error: () => {
        this.errorMessage = "Unable to find stock with symbol " + symbol;
      }
    });
  }
}
