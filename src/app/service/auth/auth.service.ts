import {Injectable, OnInit} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {UserLoader} from "./loader/user-loader";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  public token: string | null;
  public adminToken: string | null;

  private _currentUser: User;
  private _currentAdmin: User;

  constructor(private http: HttpClient, private route: Router){
    this.token = localStorage.getItem('token');
    this.adminToken = localStorage.getItem('adminToken');
  }

  public login(login: string, password: string) {
    let auth = new Auth();
    auth.login = login;
    auth.password = password;
    this.http.post<Token>(`${this.apiServerUrl}/auth/login`, auth).subscribe({
      next: token => {
        this.token = token.token;
        localStorage.setItem('token', token.token);
        this.findCurrentUser();
        this.route.navigate(['/home']).then();
      },
      error: error => {
        this.route.navigate(['/login/error']).then();
      }
    });
  }

  public signup(login: string, password: string) {
    let auth = new Auth();
    auth.login = login;
    auth.password = password;
    this.http.post<Token>(`${this.apiServerUrl}/auth/signup`, auth).subscribe({
      next: token => {
        this.token = token.token;
        localStorage.setItem('token', token.token);
        this.findCurrentUser();
        this.route.navigate(['/home']).then();
      },
      error: error => {
        this.route.navigate(['/signup/error']).then();
      }
    });
  }

  public loginAdmin(login: string, password: string) {
    let auth = new Auth();
    auth.login = login;
    auth.password = password;
    this.http.post<Token>(`${this.apiServerUrl}/auth/login`, auth).subscribe({
      next: token => {
        this.adminToken = token.token;
        localStorage.setItem('adminToken', token.token);
        this.findCurrentAdminUser();
        this.route.navigate(['/backoffice/users']).then();
      },
      error: error => {
        this.route.navigateByUrl('/backoffice/login/error');
      }
    });
  }

  public findCurrentAdminUser() {
    this.token = null;
    localStorage.setItem('token', this.token);
    this.http.get<User>(`${this.apiServerUrl}/users/current`).subscribe({
      next: admin => {
        if (admin.role.name == 'Admin') {
          this._currentAdmin = admin;
        } else {
          this.adminToken = null;
          this._currentAdmin = null;
          localStorage.setItem('adminToken', null);
        }
      },
      error: error => {
        alert(JSON.stringify(error.json()));
        this._currentUser = null;
      }
    });
  }

  public findCurrentUser() {
    this.http.get<User>(`${this.apiServerUrl}/users/current`).subscribe({
      next: currentUser => {
        this._currentUser = currentUser;
      },
      error: error => {
        this._currentUser = null;
        this.token = null;
        localStorage.setItem('token', this.token);
      }
    });
  }

  get currentUser(): User {
    return this._currentUser;
  }

  set currentUser(value: User) {
    this._currentUser = value;
  }

  get currentAdmin(): User {
    return this._currentAdmin;
  }

  set currentAdmin(value: User) {
    this._currentAdmin = value;
  }
}

class Auth {
  login: string;
  password: string;
}

class Token {
  token: string;
}
