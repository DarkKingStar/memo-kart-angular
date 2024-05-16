import { Component, SimpleChanges, inject } from '@angular/core';
import { getCartRequest } from '../../state/Cart/cart.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../Models/AppState';
import { Store, select } from '@ngrx/store';
import { ProductService } from '../../state/Product/product.service';
import { CartService } from '../../state/Cart/cart.service';
import { Observable } from 'rxjs';
import { productData } from '../../Data/productData';
import { ProductCardComponent } from '../../components/customer/product-card/product-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StarRatingComponent } from '../../components/customer/star-rating/star-rating.component';
import { ProductReviewCardComponent } from '../../components/customer/product-review-card/product-review-card.component';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { AuthComponent } from '../../components/auth/auth.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,ProductCardComponent,ProductReviewCardComponent,MatProgressBarModule,MatRadioModule,MatButtonModule,FormsModule,StarRatingComponent,],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  selectedSize!: string;
  relatedProducts: any;
  cartstate$!: Observable<any>;
  authstate$!: Observable<any>;
  dialogRef?: MatDialogRef<AuthComponent>;
  reviews = [1, 1, 1];
  productDetails$!: Observable<any>;
  productId!: Number;
  categoryRelation!: string | null;
  routerEventsSubscription: any;
  activatedRoute: any;
  toaster= inject(ToastrService)

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private productService: ProductService,
    private cartService:CartService,
    
  ) {
    this.relatedProducts = productData;
    this.cartstate$ = this.store.select(state => state.cart);
    this.authstate$ = this.store.select(state => state.auth.user);
  }

  navigateToCart = () => {
    this.router.navigate(['/cart']);
  };

  getAllData = (id: any) =>{
    if (id) {
      console.log('product id ', id);
      window.scrollTo(0, 0);
      this.productService.findProductById(id)
    }

    this.productDetails$ = this.store.select(
      (state) => state.product.selectedProduct
    );

    this.productDetails$.subscribe((productdata) => {
      this.productId = Number(productdata?.id);
      this.categoryRelation = productdata?.category?.name;
      var reqData = {
        category: this.categoryRelation,
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 10000,
        minDiscount: 0,
        sort: 'price_low',
        pageNumber: 0,
        pageSize: 20,
        stock: null,
      };
  
      this.productService.findProductsByCategory(reqData);
    });
    this.store
    .pipe(select((store: AppState) => store.product))
    .subscribe((product) => {
      this.relatedProducts = product.products.content;
    });

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getAllData(id)
  }
  navigateToProductDetailPage = (id: string) => {
    this.router.navigate([`/product-details/${id}`]);
    this.getAllData(id)
  }
  handleAddToCart = () => {
    const data = { size: this.selectedSize, productId: this.productId };
    this.cartService.addItemToCart(data)
    console.log("req --- ",data);
    // this.store.dispatch(getCartRequest());
    // this.cartService.getCart()
    this.cartstate$.subscribe((data) => {
      if(data?.loading == false && data?.error !== true){     
      }
      else if(data?.loading == false && data?.error == true){
        this.toaster.error("You need to Login");
      }
    });
    if(localStorage.getItem('jwt') == null){
      this.openLoginModal();
    }
  };
  openLoginModal(): void {
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false,
    });
  }
}
