import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/Home/home.component';
import { ProfileComponent } from './Pages/ProfilePage/profile.component';
import { CartComponent } from './Pages/CartPage/cart.component';
import { SearchComponent } from './Pages/SearchPage/search.component';
import { ProductDetailsComponent } from './Pages/ProductDetailsPage/product-details.component';
import { CheckoutComponent } from './Pages/CheckoutPage/checkout.component';
import { PaymentComponent } from './Pages/PaymentPage/payment.component';
import { PaymentSuccessComponent } from './Pages/PaymentSuccessPage/payment-success.component';
import { ProductsComponent } from './Pages/ProductPage/products.component';
import { OrderComponent } from './Pages/OrderPage/order.component';
import { OrderDetailsComponent } from './Pages/OrderDetailsPage/order-details.component';
import { DashboardComponent } from './Pages/AdminPage/Dashboard/dashboard.component';
import { AdminComponent } from './Pages/AdminPage/admin.component';
import { AdminOrdersComponent } from './Pages/AdminPage/Orders/admin-orders.component';
import { AdminProductsComponent } from './Pages/AdminPage/Products/admin-products.component';
import { CustomersComponent } from './Pages/AdminPage/Customers/customers.component';
import { AddProductComponent } from './Pages/AdminPage/AddProduct/add-product.component';

export const routers: Routes = [
  { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    {path:'cart',component:CartComponent},
    {path:'search/:query', component: SearchComponent},
    {path:'product-details/:id',component:ProductDetailsComponent}, 
    {path:'checkout',component:CheckoutComponent}, 
    {path:'checkout/payment/:id',component:PaymentComponent}, 
    {path:'payment-success',component:PaymentSuccessComponent},
  { path: ':lavelOne/:lavelTwo/:lavelThree', component: ProductsComponent }, 
    { path: 'account/orders', component: OrderComponent }, 
    { path: 'order/:orderId', component: OrderDetailsComponent }, 
    {path: 'admin',component:AdminComponent,children:[ 
      {path:"",component:DashboardComponent}, 
      {path:"orders",component:AdminOrdersComponent},
      {path:"products",component:AdminProductsComponent}, 
      {path:"customers",component:CustomersComponent}, 
      {path:"add-products",component:AddProductComponent},
    ]}
];
