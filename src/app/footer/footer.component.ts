import { Component, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';
import { CommonModule } from '@angular/common';
import { HousingLocatinComponent } from '../housing-locatin/housing-locatin.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, CarouselModule, FormsModule, HousingLocatinComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  filteredLocationList = signal<HouseingLocation[]>([]);
  constructor(private housingService: HousingService) {
    this.housingService.getAllHousingLocations().subscribe((res:any)=>this.filteredLocationList.set(res));
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    dots: true,
    autoplaySpeed:1000,
    navSpeed: 1000,
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
