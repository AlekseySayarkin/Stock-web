import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.currentUser = null;
    this.authService.token = null;
    localStorage.setItem('token', null);
    this.route.navigate(['home']);
  }
}
