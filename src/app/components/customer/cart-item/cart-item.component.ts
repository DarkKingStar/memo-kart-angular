import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { CartService } from '../../../state/Cart/cart.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
@Input() product:any;
@Input() showButton:any;
@Input() myMethod!: Function;

constructor(private cartService:CartService){}

updateCartItem = (quantity: number) => {
  this.cartService.updateCartItem({
    cartItemId: this.product.id,
    data: { quantity: quantity + this.product.quantity },
  });
  this.myMethod();

};

removeCartItem(){
  this.cartService.removeCartItem(this.product.id)
  this.myMethod();

}
}
