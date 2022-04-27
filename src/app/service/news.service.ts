import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {News} from "../model/news";
import {User} from "../model/user";

@Injectable({providedIn: 'root'})
export class NewsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public findNews(symbol: string, size: number): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiServerUrl}/news/${symbol}`, {
      params: {
        size: size
      }
    });
  }

  public findTopNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiServerUrl}/news/top`);
  }

  public saveNews(news: News) {
    this.http.post<News>(`${this.apiServerUrl}/news`, news).subscribe({
      error: error => {
        alert(JSON.stringify(error.json()));
      }
    });
  }

  public sendNews(id: number) {
    this.http.post(`${this.apiServerUrl}/news/telegram/${id}`, null).subscribe({
      error: error => {
        alert(JSON.stringify(error.json()));
      }
    });
  }

  public findAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiServerUrl}/news/all`);
  }
}
