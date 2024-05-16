import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { OrderService } from '../../../state/Order/order.service';
import { AppState } from '../../../Models/AppState';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { AdressCardComponent } from '../adress-card/adress-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    AdressCardComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent {
  myForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    streetAddress: ['', Validators.required],
    city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    state: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    zipCode: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]],
    mobile: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
  });

  adresses: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private orderService: OrderService
  ) {
    this.store.pipe(select((state) => state)).subscribe((store) => {
      console.log('address ', store);
      this.adresses = store.user.userProfile.addresses;
    });
  }

  // ngOnInit() {

  // }

  handleCreateOrder = (reqData: any) => {
    this.orderService.createOrder(reqData);
    // this.router.navigate(['/checkout/payment']);
    console.log('handle submit - : ', reqData);
  };

  handleSubmit = () => {
    const formValue = this.myForm.value;
    const reqData = formValue;
    if(this.myForm.invalid){
      return;
    }
    this.handleCreateOrder(reqData);
  };
}
