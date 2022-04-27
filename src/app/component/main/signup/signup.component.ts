import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth/auth.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ValidatorUtil} from "../../../service/validator.util";

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public errorMessage: string = null

  constructor(private authService: AuthService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.rout.params.subscribe(params => {
      if (params['message'] != null) {
        this.errorMessage = "Unable to sign in user"
      }
    })
  }

  public signUpUser(itemForm: NgForm) {
    let login = itemForm.value.login
    let password = itemForm.value.password
    this.errorMessage = ValidatorUtil.validateAndReturnErrorMessage(login, ValidatorUtil.login)
    this.errorMessage = ValidatorUtil.validateAndReturnErrorMessage(password, ValidatorUtil.password)
    if (this.errorMessage == null) {
      this.authService.signup(login, password);
    }
  }
}
