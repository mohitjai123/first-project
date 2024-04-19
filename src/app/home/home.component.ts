import { Component, HostListener, NgModule, WritableSignal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';

import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o"
import { HousingLocatinComponent } from '../housing-locatin/housing-locatin.component';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { FullImageComponent } from '../components/full-image/full-image.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, HousingLocatinComponent, RouterLink, FullImageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HouseingLocation[] = [];
  updateData = this.housingService.updateDataDetails.data;
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
  constructor(public housingService:HousingService) {
    
  }

  ngOnInit():void{
    this.getHousingData();
  }
  getHousingData(){
      this.housingService.getAllHousingLocations().subscribe(res=>{
      this.housingLocationList = res
      this.filteredLocationList.set(this.housingLocationList);
      this.likedPlace = this.housingService.getLikedPlace();
      });
  }
  handleAddData(){
  
    if(this.housingService.updateDataDetails.edit){
        this.housingService.updateHousingLocation(this.housingService.updateDataDetails.id, this.updateData()).subscribe((res:any)=> {
          if(res.message)
          this.updateData.set({
            name:"",
            photo:"",
            city:"",
            state:"",
            wifi:false,
            availableUnit: 0
          })
          this.housingService.updateDataDetails.edit=false;
          this.getHousingData()
        })
    }
    else {
      this.housingService.createHousing(this.updateData()).subscribe((res:any)=>{
        if(res.message)
          this.updateData.set({
            name:"",
            photo:"",
            city:"",
            state:"",
            wifi:false,
            availableUnit: 0
          })
          this.getHousingData()
        })
    }
  }

}


