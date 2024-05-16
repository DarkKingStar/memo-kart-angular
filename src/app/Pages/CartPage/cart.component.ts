import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../state/Cart/cart.service';
import { AppState } from '../../Models/AppState';
import { Store, select } from '@ngrx/store';
import { CartItemComponent } from '../../components/customer/cart-item/cart-item.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent,MatDividerModule,MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products = [];
  cart: any;
  cartItems:any;
  toaster= inject(ToastrService);

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.updateCart();
  }

  updateCart(){
    this.cartService.getCart();
    this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
      this.cart = cart;
      this.cartItems = cart.cartItems.slice().sort((a: any, b: any) => a.id - b.id);
    });
  }

  get myMethodFunc() {
    return this.myMethod.bind(this);
  }

  myMethod() {
    this.updateCart();
  }

  navigateToCheckout = () => {
    this.router.navigate(['checkout']);
  };

  removeCartItem = (cartItemId: Number) => {
    this.cartService.removeCartItem(cartItemId);
  };


}
