import { Component } from '@angular/core';
import { gounsPage1 } from '../../Data/gouns';
import { MainCauroselComponent } from '../../components/customer/main-caurosel/main-caurosel.component';
import { ProductCardSliderComponent } from '../../components/customer/product-card-slider/product-card-slider.component';
import { lehngacholiPage2, men_kurta, mensShoesPage1, kurtaPage1 } from '../../Data';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MainCauroselComponent, ProductCardSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: any[] = [];
  gouns: any;
  saree: any;
  men_kurta: any;
  shoes: any;

  constructor() {
    this.products = kurtaPage1.slice(0, 5); //Women's Kurti
    this.gouns = gounsPage1.slice(0, 5); // gouns
    this.saree = lehngacholiPage2.slice(0, 5); // lengha
    this.men_kurta = men_kurta.slice(0, 5); //Men's kurta
    this.shoes = mensShoesPage1.slice(0, 5); // shoes
  }
}
