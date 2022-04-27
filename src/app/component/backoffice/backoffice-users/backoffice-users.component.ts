import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {User} from "../../../model/user";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-backoffice-users',
  templateUrl: './backoffice-users.component.html',
  styleUrls: ['./backoffice-users.component.css']
})
export class BackofficeUsersComponent implements OnInit {

  public users: User[];

  constructor(public authService: AuthService, private route: Router, public userService: UserService) { }

  ngOnInit(): void {
    if ((this.authService.adminToken == null || this.authService.adminToken == 'null')) {
      this.route.navigate(['/backoffice/login']);
    }

    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
      }
    })
  }

  saveUser(itemForm: NgForm, oldLogin: string) {
    let login = itemForm.value.login;
    if (login == null || login.length < 3) {
      return;
    }
    let user: User;

    this.users.forEach(u => {
      if (u.login == oldLogin) {
        user = u;
        return;
      }
    })
    if (user != null) {
      user.login = login;
      this.userService.saveUser(user);
    }
    window.location.reload();
  }

  deleteUser(login: string) {
    let user: User;

    this.users.forEach(u => {
      if (u.login == login) {
        user = u;
        return;
      }
    })

    if (user != null) {
      this.userService.deleteUser(user.id);
      const index = this.users.indexOf(user, 0);
      if (index > -1) {
        this.users.splice(index, 1);
      }
    }
  }

  subscribe(login: string) {
    let user: User;

    this.users.forEach(u => {
      if (u.login == login) {
        user = u;
        return;
      }
    })

    if (user != null) {
      user.role.id = 2;
      user.role.name = "Paid User";
      this.userService.saveUser(user);
    }
  }

  unsubscribe(login: string) {
    let user: User;

    this.users.forEach(u => {
      if (u.login == login) {
        user = u;
        return;
      }
    })

    if (user != null) {
      user.role.id = 1;
      user.role.name = "User";
      this.userService.saveUser(user);
    }
  }
}
