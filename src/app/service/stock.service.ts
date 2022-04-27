import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Stock, StockResponse} from "../model/stock";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class StockService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getStock(symbol: String): Observable<StockResponse> {
    return this.http.get<StockResponse>(`${this.apiServerUrl}/stock/${symbol}`);
  }

  public getStockHistory(symbol: String): Observable<any> {
    return this.http.get<any>('https://financialmodelingprep.com/api/v3/technical_indicator/daily/'+ symbol+'?period=10&type=ema&&apikey=94acbb4b63c742935f2b5652f0454867')
    //return this.http.get<any>('https://financialmodelingprep.com/api/v3/historical-price-full/'+ symbol+'?apikey=844793abb6b156a1dab3cf704d41b2ba')
  }

  public subscribe(symbol: String){
    this.http.post(`${this.apiServerUrl}/stock/follow/${symbol}`, null).subscribe()
  }

  public unsubscribe(symbol: String) {
    this.http.post(`${this.apiServerUrl}/stock/unfollow/${symbol}`, null).subscribe()
  }
}
