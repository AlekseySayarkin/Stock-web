import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

import {AuthService} from "./auth.service";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
      const token = this.authenticationService.token;
      if (token != null && token.length > 0) {
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token)
        });
        return next.handle(request);
      } else {
        const adminToken = this.authenticationService.adminToken;
        if (adminToken != null && adminToken.length > 0) {
          request = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + adminToken)
          });
        }
      }

      return next.handle(request);
    }
}
