import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users`, {
      params: {
        size: 100,
        page: 1,
        direction: 'ASC'
      }
    });
  }

  public saveUser(user: User) {
    this.http.put<User>(`${this.apiServerUrl}/users`, user).subscribe({
      error: error => {
        alert(JSON.stringify(error.json()));
      }
    });
  }

  public deleteUser(id: number) {
    this.http.delete(`${this.apiServerUrl}/users/id/${id}`).subscribe({
      error: error => {
        alert("Unable to delete user with id: " + id);
      }
    });
  }
}
