import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit{

  public editUser: User;

  constructor(public authService: AuthService, private userService: UserService, private route: Router) {
    this.editUser! = this.authService.currentUser;
  }

  ngOnInit(): void {
  }

  public saveUser(itemForm: NgForm) {
    let login = itemForm.value.login;
    if (login != null && login.length > 3) {
      this.editUser.login = login;
      this.userService.saveUser(this.editUser);
    }
    this.route.navigate(['/profile']);
  }

  public deleteStock(id: number) {
    let stocks = this.editUser.systemStocks;
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id == id) {
        stocks.splice(i, 1);
        this.editUser.systemStocks = stocks;
        this.userService.saveUser(this.editUser);
        return;
      }
    }
  }
}
