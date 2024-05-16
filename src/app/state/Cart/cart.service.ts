import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { addItemToCartFailure, addItemToCartSuccess, getCartFailure, getCartSuccess, removeCartItemFailure, removeCartItemSuccess, updateCartItemFailure, updateCartItemSuccess } from './cart.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_API_URL } from '../../config/api';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_BASE_URL = BASE_API_URL;
  private headers;
  toaster = inject(ToastrService)

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  addItemToCart(reqData: any) {
    const url = `${this.API_BASE_URL}/cart/add`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .put(url, reqData, { headers })
      .pipe(
        map((data: any) => {
          this.toaster.success("item added to cart");
          return addItemToCartSuccess({payload:data});
        }),
        catchError((error: any) => {
          this.toaster.error("failed to add cart item");
          return of(addItemToCartFailure(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  getCart() {
    const url = `${this.API_BASE_URL}/cart/`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers }).pipe(
      map((data:any)=>{
        return getCartSuccess({payload:data})
      }),
      catchError((error: any) => {
        this.toaster.error("failed to get cart items");
        return of(getCartFailure(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  removeCartItem(cartItemId:Number) {
    const url = `${this.API_BASE_URL}/cart_items/${cartItemId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers }).pipe(
      map((data:any)=>removeCartItemSuccess({cartItemId})),
      catchError((error: any) => {
        this.toaster.error("failed to remove cart item");
        return of(removeCartItemFailure(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
      })
    ).subscribe((action) => this.store.dispatch(action));
  } 

  updateCartItem(reqData: any) {
    const url = `${this.API_BASE_URL}/cart_items/${reqData.cartItemId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(url, reqData.data, { headers }).pipe(
      map((data:any)=>
        updateCartItemSuccess({payload:data})),
      catchError((error: any) => {
        this.toaster.error("failed to update cart item");
        return of(updateCartItemFailure(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
      })
    ).subscribe((action) => this.store.dispatch(action));
  }
}
