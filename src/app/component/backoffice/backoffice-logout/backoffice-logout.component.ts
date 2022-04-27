import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-backoffice-logout',
  templateUrl: './backoffice-logout.component.html',
  styleUrls: ['./backoffice-logout.component.css']
})
export class BackofficeLogoutComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.currentAdmin = null;
    this.authService.adminToken = null;
    localStorage.setItem('adminToken', null);

    this.route.navigate(['backoffice/login']).then();
  }
}
