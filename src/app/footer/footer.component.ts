import { Component, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';
import { CommonModule } from '@angular/common';
import { HousingLocatinComponent } from '../housing-locatin/housing-locatin.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, CarouselModule, HousingLocatinComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  filteredLocationList = signal<HouseingLocation[]>([]);
  constructor(private housingService: HousingService) {
    this.filteredLocationList.set(this.housingService.getAllHousingLocations());
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<div class="bg-red-500 flex items-center justify-center text-3xl hover:bg-red-700 absolute left-8 top-[50%] h-10 w-10 rounded-full"> « </div>', 
    '<div class="bg-red-500 absolute right-4 hover:bg-red-700 top-[50%] flex items-center justify-center text-3xl p-2 h-10 w-10 rounded-full"> »</div>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
