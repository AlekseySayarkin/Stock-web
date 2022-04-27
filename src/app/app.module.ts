import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NewsService} from "./service/news.service";
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import { LoginComponent } from './component/main/login/login.component';
import {BasicAuthInterceptor} from "./service/auth/basic-auth-interceptor";
import { SignupComponent } from './component/main/signup/signup.component';
import { ProfileComponent } from './component/main/profile/profile.component';
import {UserLoader} from "./service/auth/loader/user-loader";
import { ProfileEditorComponent } from './component/main/profile-editor/profile-editor.component';
import { LogoutComponent } from './component/main/logout/logout.component';
import { SearchComponent } from './component/main/search/search.component';
import { SubscribedComponent } from './component/main/subscribed/subscribed.component';
import { StockInfoComponent } from './component/main/stock-info/stock-info.component';
import {StockChartAllModule} from "@syncfusion/ej2-angular-charts";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  IgxFinancialChartModule,
  IgxLegendModule
} from "igniteui-angular-charts";
import {DatePipe} from "@angular/common";
import { BackofficeHeaderComponent } from './component/backoffice/backoffice-header/backoffice-header.component';
import { BackofficeUsersComponent } from './component/backoffice/backoffice-users/backoffice-users.component';
import { BackofficeLoginComponent } from './component/backoffice/backoffice-login/backoffice-login.component';
import { BackofficeNewsComponent } from './component/backoffice/backoffice-news/backoffice-news.component';
import { BackofficeLogoutComponent } from './component/backoffice/backoffice-logout/backoffice-logout.component';

@NgModule({
  declarations: [
    AppComponent, routingComponents, LoginComponent, SignupComponent, ProfileComponent, UserLoader, ProfileEditorComponent, LogoutComponent, SearchComponent, SubscribedComponent, StockInfoComponent, BackofficeHeaderComponent, BackofficeUsersComponent, BackofficeLoginComponent, BackofficeNewsComponent, BackofficeLogoutComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, StockChartAllModule, IgxFinancialChartModule, IgxLegendModule, NgbModule
  ],
  providers: [
    NewsService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
