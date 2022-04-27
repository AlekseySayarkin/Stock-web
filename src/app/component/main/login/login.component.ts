import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../service/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ValidatorUtil} from "../../../service/validator.util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorMessage: string = null;

  constructor(private authService: AuthService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.params.subscribe(params => {
      if (params['message'] != null) {
        this.errorMessage = "Unable to login user";
      }
    })
  }

  public loginUser(itemForm: NgForm) {
    let login = itemForm.value.login
    let password = itemForm.value.password
    this.errorMessage = ValidatorUtil.validateAndReturnErrorMessage(login, ValidatorUtil.login)
    this.errorMessage = ValidatorUtil.validateAndReturnErrorMessage(password, ValidatorUtil.password)
    if (this.errorMessage == null) {
      this.authService.login(login, password);
    }
  }
}
