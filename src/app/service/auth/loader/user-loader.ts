import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-loader',
  template: ''
})
export class UserLoader implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.token != null && this.authService.token != 'null') {
      this.authService.findCurrentUser();
    } else if ((this.authService.adminToken != null && this.authService.adminToken != 'null')) {
      this.authService.findCurrentAdminUser();
    } else {
      this.authService.adminToken = null;
      this.authService.token = null;
    }
  }
}
