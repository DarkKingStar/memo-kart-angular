import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../state/Auth/auth.service';
import { Observable } from 'rxjs';
import { AppState } from '../../../Models/AppState';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../../state/User/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginstate$: Observable<any>;
  errorMessage : String | undefined;
  toaster= inject(ToastrService)


  @Input()
  changeTemplate!: () => void;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.loginstate$ = this.store.select(state => state.auth.user);
  }
  
  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('login req data', this.loginForm.value);
      this.authService.login(this.loginForm.value);
      this.loginstate$.subscribe((data) => {
        if(data?.error){
          this.errorMessage = data?.error;
        }
      })
    }
  }

  setErrorMessage(error: any) {
    this.errorMessage = error;
  }
  

}

