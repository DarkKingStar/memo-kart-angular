import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeCarouselData } from '../../../Data/mainCarousel';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-caurosel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './main-caurosel.component.html',
  styleUrls: ['./main-caurosel.component.css']
})
export class MainCauroselComponent implements OnInit {
  carouselData = homeCarouselData;

  currentSlide = 0;
  interval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.autoPlay();
  }

  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }

  navigateTo(path: any): void {
    console.log(path);
    this.router.navigate([path])
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
    // console.log("current slide - ", this.currentSlide)
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselData.length) % this.carouselData.length;
  }
}

