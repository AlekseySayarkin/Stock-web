import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./component/main/main-page/main-page.component";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "./component/main/header/header.component";
import {LoginComponent} from "./component/main/login/login.component";
import {SignupComponent} from "./component/main/signup/signup.component";
import {ProfileComponent} from "./component/main/profile/profile.component";
import {ProfileEditorComponent} from "./component/main/profile-editor/profile-editor.component";
import {LogoutComponent} from "./component/main/logout/logout.component";
import {SearchComponent} from "./component/main/search/search.component";
import {SubscribedComponent} from "./component/main/subscribed/subscribed.component";
import {StockInfoComponent} from "./component/main/stock-info/stock-info.component";
import {BackofficeUsersComponent} from "./component/backoffice/backoffice-users/backoffice-users.component";
import {BackofficeLoginComponent} from "./component/backoffice/backoffice-login/backoffice-login.component";
import {BackofficeNewsComponent} from "./component/backoffice/backoffice-news/backoffice-news.component";
import {BackofficeLogoutComponent} from "./component/backoffice/backoffice-logout/backoffice-logout.component";

const routs: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:message',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signup/:message',
    component: SignupComponent
  },
  {
    path: 'home',
    component: MainPageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'edit',
    component: ProfileEditorComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'subscribed',
    component: SubscribedComponent
  },
  {
    path: 'stocks/:symbol',
    component: StockInfoComponent
  },
  {
    path: 'backoffice',
    redirectTo: '/backoffice/login',
    pathMatch: 'full'
  },
  {
    path: 'backoffice',
    children: [
      {
        path: 'users',
        component: BackofficeUsersComponent
      },
      {
        path: 'news',
        component: BackofficeNewsComponent
      },
      {
        path: 'login',
        component: BackofficeLoginComponent
      },
      {
        path: 'login/:message',
        component: BackofficeLoginComponent
      },
      {
        path: 'logout',
        component: BackofficeLogoutComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routs)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  MainPageComponent, HeaderComponent, LoginComponent, SignupComponent, ProfileComponent,
  ProfileEditorComponent, LogoutComponent, SearchComponent, SubscribedComponent, StockInfoComponent,
  BackofficeUsersComponent, BackofficeLoginComponent, BackofficeNewsComponent, BackofficeLogoutComponent
]
