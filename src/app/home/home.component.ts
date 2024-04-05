import { Component, NgModule, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';

import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o"
import { HousingLocatinComponent } from '../housing-locatin/housing-locatin.component';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, HousingLocatinComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HouseingLocation[] = [];
  updateData:WritableSignal<HouseingLocation> = signal({
    id:"",
    name:"",
    photo:"",
    city:"",
    state:"",
    wifi:false,
    availableUnit: 0
  });
  filteredLocationList = signal<HouseingLocation[]>([]);
  likedPlace:HouseingLocation[] = [];
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList.set(this.housingLocationList);
      return;
    }
    this.filteredLocationList.set(this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    ));
  }
  constructor(private housingService:HousingService) {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList.set(this.housingLocationList);
    this.likedPlace = this.housingService.getLikedPlace();
  }

  handleAddData(){
    
    this.updateData.update((item)=> {
      return {...item, id:String(this.filteredLocationList().length)}
    })
    
    this.filteredLocationList().push(this.updateData())
    this.updateData.set({
      id:"",
      name:"",
      photo:"",
      city:"",
      state:"",
      wifi:false,
      availableUnit: 0
    })
  }

  sideEffect = effect(()=>console.log(`new data Added Successfully ${this.updateData()}`))
}


