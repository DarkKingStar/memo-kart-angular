import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from './auth.actions';
import { Store } from '@ngrx/store';
import { BASE_API_URL } from '../../config/api';
import { User } from '../../Models/user.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = BASE_API_URL + '/auth';
  toaster= inject(ToastrService)
  dialog: MatDialog = inject(MatDialog);
  router: Router = inject(Router);
  constructor(private http: HttpClient, private store: Store) {}

  login(loginData: any) {
    return this.http
      .post<User>(`${BASE_API_URL}/auth/signin`, loginData)
      .pipe(
        map((user: any) => {
          console.log("login user ",user)
          if(user.jwt){
            localStorage.setItem("jwt",user.jwt)
            this.toaster.success("login successfully");
            setTimeout(()=>{
              this.router.navigate(['/']);
              this.dialog.closeAll();
              location.reload()
            },500);
          }
          return loginSuccess({ user });
        }),
        catchError((error) => {
          this.toaster.error("login failed");
          return of(
            loginFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  register(data: User) {
    const registerData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      role: "ROLE_CUSTOMER",
    };
    console.log('registerr data ', registerData);
    return this.http
      .post(`${BASE_API_URL}/auth/signup`, registerData)
      .pipe(
        map((data:any) => {
          if(data.jwt){
              localStorage.setItem("jwt",data.jwt)
              this.toaster.success("Registration successfully");
              setTimeout(()=>{
                this.router.navigate(['/']);
                this.dialog.closeAll();
                location.reload()
              },500);
            }
          return registerSuccess({ user: data });
        }),
        catchError((error) => {
          console.error('Error registering', error);
          this.toaster.error("failed to register");
          return of(
            registerFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }
}
