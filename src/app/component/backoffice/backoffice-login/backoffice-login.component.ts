import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ValidatorUtil} from "../../../service/validator.util";

@Component({
  selector: 'app-backoffice-login',
  templateUrl: './backoffice-login.component.html',
  styleUrls: ['./backoffice-login.component.css']
})
export class BackofficeLoginComponent implements OnInit {

  public errorMessage: string = "";

  constructor(private authService: AuthService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.params.subscribe(params => {
      if (params['message'] != null) {
        this.errorMessage = "Unable to log in admin";
      }
    })
  }

  public loginAdmin(itemForm: NgForm) {
    let login = itemForm.value.login
    let password = itemForm.value.password
    this.errorMessage = ValidatorUtil.validateAndReturnErrorMessage(login, ValidatorUtil.login)
    this.errorMessage = ValidatorUtil.validateAndReturnErrorMessage(password, ValidatorUtil.password)
    if (this.errorMessage == null) {
      this.authService.loginAdmin(login, password);
    }
  }
}
